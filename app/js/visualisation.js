d3.dsv(";", "./src/data/loto_201911.csv").then(function(data) {
    const page = d3.select("#container")

    const numeros_chance = d3.rollup(data, v => d3.count(v, d => d.numero_chance), d => d.numero_chance)
    console.log(numeros_chance)

    marginLeft=50;
    width=1000;
    marginRight=60;
    marginBottom=20;
    marginTop=45
    height=1000;
    const scaleX = d3.scaleBand()
        // .domain(numeros_chance.map(d => parseInt(d.numero_chance)).sort())
        .domain(["1","2","3","4","5","6","7","8","9", "10"])
        .range([marginLeft, width - marginRight])
        .padding(0.3);

    const scaleY = d3.scaleLinear()
        .domain([0, 120])
        .range([height, 0])

        
    // const scaleY = d3.scaleLinear()
    // .domain([0, d3.max(data, (d) => d3.count(d.numero_chance))])

    

    const svg = page.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");
    
    svg.append("g")
        .attr("fill", "#19163b")
        .attr("transform", `translate(0, ${-marginBottom})`)
        .selectAll()
        .data(numeros_chance)
        .join("rect")
        .attr("x", (d) => scaleX(d[0]))
        // .attr("y", (d) => height-marginBottom-scaleY(d[1]))
        // .attr("y", (d) => scaleY(d[1]))
        .attr("y", height)
        // .attr("height", d => scaleY(0) - scaleY(d[1]))
        .attr("height", 0)
        // .attr("y", (d) => scaleY(1000))
        // .attr("height", (d) => scaleY(d[1]))
        .attr("width", scaleX.bandwidth())

    svg.append("g")
        .attr("transform", `translate(${0},${height - marginBottom})`)
        .call(d3.axisBottom(scaleX).tickSizeOuter(0))
        .call(g => g.append("text")
        .attr("x", width-(marginRight*1.5))
        .attr("y", 20)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("→ N° chance"));
        

    svg.append("g")
    .attr("transform", `translate(${marginLeft},${-marginBottom})`)
    .call(d3.axisLeft(scaleY).tickFormat((y) => (y).toFixed()))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", marginTop)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Nombre d'apparition"));

    // Animation
    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", d => scaleY(d[1]))
        .attr("height", d => height - scaleY(d[1]))
        .delay((d,i) => {console.log(i); return i*100})
        .style("fill", "rgb(106,194,235)");

});