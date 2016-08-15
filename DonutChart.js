import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import D3 from 'd3';

var AnimatedChartBase = React.createClass({
    mixins: [ReactFauxDOM.mixins.core, ReactFauxDOM.mixins.anim],
    render: () => {
    }
});


class Chart extends AnimatedChartBase {

    static propTypes = {
        data: React.PropTypes.object,
        colors: React.PropTypes.object,
        width: React.PropTypes.number,
        height: React.PropTypes.number
    };

    constructor(props) {
        super(props);
    }
}


// https://bl.ocks.org/mbostock/5100636
// http://www.recursion.org/d3-for-mere-mortals/
// http://bl.ocks.org/mbostock/3750941

let TWO_PIE = 2 * Math.PI;


class DonutChart extends Chart {

    constructor(props) {
        super(props);
    }

    arcTween(transition, newAngle, arc, progress) {


        transition.attrTween("d", (d) => {

            var interpolate = D3.interpolate(d.endAngle, newAngle);

            return (t) => {

                console.log(t);

                progress.text((Math.ceil(d.endAngle / TWO_PIE * 100)) + '%');
                d.endAngle = interpolate(t);
                return arc(d);
            };
        });
    }

    render() {
        return (<div>{this.state.chart}</div>);
    }


    getInitialState() {
        return {look: 'stacked'}
    }

    componentDidMount() {

        var container = this.connectFauxDOM('div', 'chart')

        var arc = D3.svg.arc()
            .innerRadius((this.props.width / 2) - 5)
            .outerRadius(this.props.width / 2)
            .startAngle(0);

        let svg = D3.select(container).append('svg')
            .attr('width', this.props.width)
            .attr('height', this.props.height)
            .append('g')
            .attr('transform', 'translate(' + this.props.width / 2 + ',' + this.props.height / 2 + ')');

        svg.append('path')
            .datum({endAngle: TWO_PIE})
            .style('fill', this.props.colors[0])
            .attr('d', arc);

        var value = this.props.data[0].value / 100;


        var foreground = svg.append('path')
            .datum({endAngle: 0.01 * TWO_PIE}) // start from 0
            .style('fill', this.props.colors[1])
            .attr('d', arc);

        var progress = svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0');

        foreground.transition()
            .duration(this.props.duration)
            .call(this.arcTween, value * TWO_PIE, arc, progress);

        this.animateFauxDOM(this.props.duration);
    }
}

export default DonutChart;