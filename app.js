
function init() {
 //populate dropdown list
  d3.json("./samples.json").then((sampledata) => {
    var data = sampledata;
    var dropdown=data.names;
    var mtdata=data.metadata;
    
    dropdown.forEach((selection)=>
    {d3.select("#selDataset")
    .append("option")
    .text(selection)
    .property("value", selection)
    });
    
    initialname=dropdown[0]
    buildinfo(initialname)
    buildchart(initialname)
    bubble(initialname)
    gauge(initialname)
  });
};

init()
    
  //build info chart 

  function optionChanged(selected) {
    buildinfo(selected);
    buildchart(selected);
    bubble(selected);
    gauge(selected);
  }
 
    function buildinfo(selector) {
       d3.json("./samples.json").then((sampledata) => {
        var data = sampledata;
        var mtdata=data.metadata;
        var resultarray = mtdata.filter(record => record.id == selector);
        var result=resultarray[0]
        var info=d3.select("#sample-metadata")
        info.html("")
        Object.entries(result).forEach(([key, value]) => {
        info.append("div").text(`${key}: ${value}`);
       })
      });
    }


    // chart
    function buildchart(selector) {
      d3.json("./samples.json").then((sampledata) => {
        var data = sampledata;
        var sample=data.samples;
        var resultarray = sample.filter(record => record.id == selector);
        var result=resultarray[0];

       //bar chart
        var sorted=result.sample_values.sort((a,b)=>b-a)
        var sliced=sorted.slice(0,10);
        var reversed=sliced.reverse()
        var labels="OTU "+result.otu_ids.slice(0,10);
        var trace1 = {
        x:reversed,
        y:labels,
        text:result.otu_labels.slice(0,10),
        type: "bar",
        orientation: "h"
      };  
      var chartData1 = [trace1];  
      var layout = {
        margin: {
          l: 100,
          r: 100,
          t: 0,
          b: 100
        },
        };
    Plotly.newPlot("bar", chartData1, layout)
  });
};
    //bubble chart
    function bubble(selector) {
      d3.json("./samples.json").then((sampledata) => {
        var data = sampledata;
        var sample=data.samples;
        var resultarray = sample.filter(record => record.id == selector);
        var result=resultarray[0];
     var trace2 = {
      x:result.otu_ids,
      y:result.sample_values,
      text:result.otu_labels,
      type: "scatter",
      mode:"markers",
      marker:{
        size:result.sample_values,
        color:result.otu_ids}
    };  
    var layout = {
      margin: {
        l: 100,
        r: 100,
        t: 0,
        b: 100
      },
      };
    var chartData2 = [trace2];  
    Plotly.newPlot("bubble", chartData2, layout)
  });
};
    //gauge chart
    function gauge(selector) {
      d3.json("./samples.json").then((sampledata) => {
        var data = sampledata;
        var sample=data.samples;
        var resultarray = sample.filter(record => record.id == selector);
        var result=resultarray[0];

        var trace3={
          domain: { x: [0, 1], y: [0, 1] },
          value: 2,
          title: { text: "Belly Button Washing Frequency Scrubs per week" },
          type: "indicator",
          mode: "gauge+number",
          gauge:{
            steps:[{range:[0,1],color:"lightgray"},
            {range:[1,2],color:"white"},
            {range:[2,3],color:"lightyellow"},
            {range:[3,4],color:"yellow"},
            {range:[4,5],color:"lightgreen"},
            {range:[5,6],color:"green"},
            {range:[6,7],color:"darkgreen"},
            {range:[7,8],color:"blue"},
            {range:[8,9],color:"darkblue"},
          ],
          axis: { range: [0, 9] ,
            pointers:[{value: 2}]}
        }
      }
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        var chartData3 = [trace3];  
        Plotly.newPlot("gauge", chartData3, layout)
  });
  };