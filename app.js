const url = "./samples.json";
var sampledata;

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
    sampledata = data
    console.log(sampledata);
    populatedropdown()
});

// dropdown menu
function populatedropdown() {
    var names = sampledata.names
    var dropdown = d3.select("#selDataset")
    // loop through names/IDs
    names.forEach(name => {
        dropdown
            .append("option")
            .property("value", name)
            .text(name)
    });
    optionChanged(names[0])
}

// select in dropdown: pass IDs selected from the dropdown...
function optionChanged(sampleid) {
    buildmetadata(sampleid);
    buildCharts(sampleid);
    buildCharts2(sampleid)
};

// metadata
function buildmetadata(id) {
    // print both keys & values of our objects
    var metadata = sampledata.metadata.filter(obj => obj.id == id)[0]
    console.log(metadata)
    // run command .html("") on metadata section - will need to use D3 (check last hw table); clears old metadata so new metadata shows up
    //  or for in loop - getting sample metadata in metadata section of html; create a selector variable for html
    var selecter = d3.select("#sample-metadata")
    selecter.html("")
    for (var [k, v] of Object.entries(metadata)) {
        // var current_row = Object.values(arr[i]);
        // adds a new table row to each iteration to the tbody
        selecter.append('p').text(`${k}: ${v}`)

    }
}

// building charts
function buildCharts(name) {
    // console.log("Build Chart")
    // filter to get only 'sample' data from samples.json
    var sample = sampledata.samples.filter(obj => obj.id == name)[0]
    console.log(sample)

    var trace1 = {
        x: sample.sample_values.slice(0, 10),
        y: sample.otu_ids.map(id => `otu ${id}`).slice(0, 10),
        text: sample.otu_labels.slice(0, 10),
        type: "bar",
        orientation: 'h',
    };

    var data = [trace1];

    var layout = {
        title: "Belly Button Data",
        yaxis: { title: "OTU IDs" },
        xaxis: { title: "Values" }
    };

    Plotly.newPlot("bar", data, layout);
};

function buildCharts2(id) {
    // returns a list of objects of IDs
    var sample = sampledata.samples.filter(obj => obj.id == id)[0]
    console.log(sample)

    var trace1 = {
        x: sample.otu_ids,
        y: sample.sample_values,
        mode: 'markers',
        marker: {
          size: sample.sample_values,
          color: sample.otu_ids,
          text: sample.otu_labels
        }
      };

    // var trace1 = {
    //     x: sample.otu_ids,
    //     y: sample.sample_values,
    //     marker_size: sample.sample_values,
    //     marker_colors: sample.otu_ids,
    //     labels: sample.otu_labels,
    // };
    
        var data = [trace1];

            var layout = {
            title: "Belly Button Data",
            xaxis: { title:"OTU IDs"},
            yaxis: { title:"Values"},
            showlegend: false,
            height: 600,
            width: 1000
    };

    Plotly.newPlot('bubble', data, layout);
};