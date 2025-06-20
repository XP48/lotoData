d3.dsv(";", "./src/data/loto_201911.csv").then(function(data) {
    const barNumChance = d3.select("#barNumChance")

    const numeros_chance = d3.rollup(data, v => d3.count(v, d => d.numero_chance), d => d.numero_chance)
    console.log(numeros_chance)

    marginLeft=50;
    width=700;
    marginRight=60;
    marginBottom=20;
    marginTop=45
    height=700;
    const scaleX = d3.scaleBand()
        .domain(["1","2","3","4","5","6","7","8","9", "10"])
        .range([marginLeft, width - marginRight])
        .padding(0.3);

    const scaleY = d3.scaleLinear()
        .domain([0, 120])
        .range([height, 0])

    

    const svg = barNumChance.append("svg")
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
        .attr("y", height)
        .attr("height", 0)
        .attr("width", scaleX.bandwidth())

    svg.append("g")
        .attr("transform", `translate(${0},${height - marginBottom})`)
        .call(d3.axisBottom(scaleX).tickSizeOuter(0))
        .call(g => g.append("text")
        .attr("x", width-(marginRight*1.3))
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
    function anim() {
        svg.selectAll("rect")
            .style("fill", "#19163b")
            .attr("y", height)
            .attr("height", 0)
        svg.selectAll("rect")
            .transition()
            .duration(1000)
            .attr("y", d => scaleY(d[1]))
            .attr("height", d => height - scaleY(d[1]))
            .delay((d,i) => i*100)
            .style("fill", "rgb(106,194,235)");
    }
    anim()

    document.getElementById("barNumChance").addEventListener("click", anim)

    // 2ème graphique :

    const barNbWinDay = d3.select("#barNbWinDay")
    data = data.filter(function(d){ return d.nombre_de_gagnant_au_rang1 != 0 })
    const jours = d3.rollup(data, v => d3.sum(v, d => d.nombre_de_gagnant_au_rang1), d => d.jour_de_tirage)
    console.log(jours)

    // marginLeft=50;
    // width=1000;
    // marginRight=60;
    // marginBottom=20;
    // marginTop=45
    // height=1000;
    const scaleX2 = d3.scaleBand()
        .domain(["LUNDI", "MERCREDI", "SAMEDI"])
        .range([marginLeft, width - marginRight])
        .padding(0.3);

    const scaleY2 = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0])



    svg2 = barNbWinDay.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");
    
    svg2.append("g")
        .attr("fill", "#19163b")
        .attr("transform", `translate(0, ${-marginBottom})`)
        .selectAll()
        .data(jours)
        .join("rect")
        .attr("x", (d) => scaleX2(d[0]))
        .attr("y", height)
        .attr("height", 0)
        .attr("width", scaleX2.bandwidth())

    svg2.append("g")
        .attr("transform", `translate(${0},${height - marginBottom})`)
        .call(d3.axisBottom(scaleX2).tickSizeOuter(0))
        .call(g => g.append("text")
        .attr("x", width-(marginRight*2))
        .attr("y", 20)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("→ Jour de tirage"));
        

    svg2.append("g")
    .attr("transform", `translate(${marginLeft},${-marginBottom})`)
    .call(d3.axisLeft(scaleY2).tickFormat((y) => (y).toFixed()))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", marginTop)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Nombre de gagnants"));

    // Animation
    function anim2() {
        svg2.selectAll("rect")
            .style("fill", "#19163b")
            .attr("y", height)
            .attr("height", 0)
        svg2.selectAll("rect")
            .transition()
            .duration(1000)
            .attr("y", d => scaleY(d[1]))
            .attr("height", d => height - scaleY(d[1]))
            .delay((d,i) => i*100)
            .style("fill", "rgb(106,194,235)");
    }
    anim2()

    document.getElementById("barNbWinDay").addEventListener("click", anim2)


    // 3ème graphiqe
    const barNum = d3.select("#barNum")

    const numeros = d3.rollup(
        data.flatMap(d => [d.boule_1, d.boule_2, d.boule_3, d.boule_4, d.boule_5].map(Number)),
        v => v.length,
        d => d
      );
    console.log(numeros)

    marginLeft=50;
    width=1500;
    marginRight=60;
    marginBottom=20;
    marginTop=45
    height=1000;
    const scaleX3 = d3.scaleBand()
        .domain(Array.from(numeros.keys()).sort((a, b) => a - b))
        .range([marginLeft, width - marginRight])
        .padding(0.3);

    const scaleY3 = d3.scaleLinear()
        .domain([0, 30])
        .range([height, 0])

    

    const svg3 = barNum.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto;");
    
    svg3.append("g")
        .attr("fill", "#19163b")
        .attr("transform", `translate(0, ${-marginBottom})`)
        .selectAll()
        .data(numeros)
        .join("rect")
        .attr("x", (d) => scaleX3(d[0]))
        .attr("y", height)
        .attr("height", 0)
        .attr("width", scaleX3.bandwidth())

    svg3.append("g")
        .attr("transform", `translate(${0},${height - marginBottom})`)
        .call(d3.axisBottom(scaleX3).tickSizeOuter(0))
        .call(g => g.append("text")
        .attr("x", width-(marginRight))
        .attr("y", 20)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("→ N°"));
        

    svg3.append("g")
    .attr("transform", `translate(${marginLeft},${-marginBottom})`)
    .call(d3.axisLeft(scaleY3).tickFormat((y) => (y).toFixed()))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", -marginLeft)
        .attr("y", marginTop)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Nombre d'apparition"));

    // Animation
    function anim3() {
        svg3.selectAll("rect")
            .style("fill", "#19163b")
            .attr("y", height)
            .attr("height", 0)
        svg3.selectAll("rect")
            .transition()
            .duration(1000)
            .attr("y", d => scaleY3(d[1]))
            .attr("height", d => height - scaleY3(d[1]))
            .delay((d,i) => i*100)
            .style("fill", "rgb(106,194,235)");
    }
    anim3()

    document.getElementById("barNum").addEventListener("click", anim3)

});

function getGraphNumber(number, divId) {
    d3.dsv(";", "./src/data/loto_201911.csv").then(function(data) {
    // Graphique custom par rapport au numéro choisi
    const graph = d3.select(`#${divId}`)
    const tau = 2 * Math.PI;

    console.log(data.length * 5, " boules tirés")

    function getAngle(number) {
        const count = d3.rollup(
            data,
            v => d3.sum(v, d => {
            return [d.boule_1, d.boule_2, d.boule_3, d.boule_4, d.boule_5].filter(b => +b === number).length;
            })
        );
        console.log(count / (data.length * 5) * 100 * tau)

        return (count / (data.length * 5)) * 100 * tau

    }

    const angle = getAngle(number);



    const height = Math.min(1000, width / 2);

    const outerRadius = height / 2 - 10;
    const innerRadius = outerRadius * 0.75;

    const svg4 = graph.append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]);

    const g = svg4.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0);

    const centerText = g.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("fill", "currentColor")
        .style("font-size", "18px")
        .text(`${Math.ceil(angle * 100 / 360)}% `);

    const background = g.append("path")
        .datum({endAngle: tau})
        .style("fill", "#19163b")
        .attr("d", arc);

    function anim() {
        const foreground = g.append("path")
            .datum({endAngle: 1 * tau})
            .style("fill", "rgb(106,194,235)")
            .attr("d", arc);
    
        foreground.transition()
            .duration(750)
            .attrTween("d", function(d) {
              const interpolate = d3.interpolate(d.endAngle, angle / 100);
              return function(t) {
                d.endAngle = interpolate(t);
                return arc(d);
              };
            });
    }

    anim()
    document.getElementById(`${divId}`).addEventListener("click", anim)

      

});
}

