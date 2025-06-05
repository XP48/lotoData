d3.csv("./src/data/loto_201911.csv").then(function(data) {
    const page = d3.select("#container")

    marginLeft=0;
    width=1000;
    marginRight=0;
    height=1000;
    const scaleX = d3.scaleBand()
        .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // descending frequency
        .range([marginLeft, width - marginRight])
        .padding(0.1);

    const scaleY = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => count(d.numero_chance))])

    const svg = page.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");
    
    svg.append("g")
        .attr("fill", "steelblue")
        .selectAll()
        .data(data)
        .join("rect")
        .attr("x", (d) => scaleX(d.numero_chance))
        .attr("y", (d) => scaleY(count(d.numero_chance)))
        .attr("height", (d) => y(0) - y(d.frequency))
        .attr("width", x.bandwidth());

    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Frequency (%)"));

});