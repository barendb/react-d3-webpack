import React from 'react';
import DonutChart from './DonutChart';

class App extends React.Component {
    render () {
        // pretend we have a service fetching/retrieving the data
        let data = [{label: "Margarita", value: 20.0}];
        let colors = ['#ff7f0e', '#17becf']
        return (<div>
            <DonutChart data={data} colors={colors} width="200" height="200" duration="1000">

            </DonutChart>
        </div>);
    }
}

export default App;