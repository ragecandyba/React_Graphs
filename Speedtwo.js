import React, { useEffect } from "react";
import "./Speedtwo.css";
import { Chart } from "chart.js/auto";

const Speedtwo = () => {
  useEffect(() => {
    const canvas = document.getElementById("myChart");
    const ctx = canvas.getContext("2d");

    /*Destroy if any chart instance already exist */
    if (canvas.chart) {
      canvas.chart.destroy();
    }

    const data = {
      //   labels: ["Mon", "Tue", "Wed"], /*Labels in chart */
      datasets: [
        {
          data: [100] /*No.of data */,
          backgroundColor: [
            "rgba(75, 192, 192, 1)",
          ] /*Color of each line (depends on no.of data) */,
          needleValue: 95.25,
          borderColor: "white",
          borderWidth: 1,
          cutout:
            "95%" /*Cut the doughnut graph by 95%, decrese the thickness */,
          circumference: 180 /*We only want a semicircle */,
          rotation: 270,
          borderRadius: 5,
        },
      ],
    };

    const gaugeNeedle = {
      id: "gaugeNeedle",
      afterDatasetDraw(chart) {
        const {
          ctx,
          data,
          chartArea: { width, height },
        } = chart;

        ctx.save();
        const needleValue = data.datasets[0].needleValue;
        const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);
        const angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI;

        const cx = width / 2;
        const cy = chart._metasets[0].data[0].y;

        /*needle */
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(
          130,
          0
        ); /* startpoint and endpoint */ /*Also have to be updated dynamically due to different height of page */
        ctx.lineTo(
          height / 2,
          0
        ); /*needle height */ /*Has to be dynamically update (denominator value), as the height of page can be different for all */
        ctx.strokeStyle = "#444";
        ctx.lineWidth = 2;
        ctx.stroke();

        /*needle dot */
        ctx.translate(-cx, -cy); /* dot position */
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, 10); /*dot */
        ctx.fill();
        ctx.restore();

        /*If you are not using needle dot, add ctx.restore at the end of needle, and if you are using, keep the code as it is */

        /* Text below speed-o-meter */
        ctx.font = "50px Helvetica";
        ctx.fillStyle = "#444";
        ctx.fillText(needleValue + "%", cx, cy + 50); /* position of text*/
        ctx.textAlign = "center";
        ctx.restore();
      },
    };

    const config = {
      type: "doughnut",
      data,
      options: {
        plugins: {
          legend: {
            display: false /*if you want to display keys, change it to true */,
          },
          tooltip: {
            /*like a key, displayed when mouse is hovered on the speed-o-meter */
            yAlign:
              "bottom" /*position of tooltip (as the graph is rotated, here top is bottom and vice-versa) */,
            displayColors: false /*display the color or not */,
            callbacks: {
              label: function (tooltipItems) {
                const tracker = tooltipItems.dataset.needleValue;
                return `Tracker Score: ${tracker} %`; /*value or things to display in the label */

                // return `Tracker Score: ${50} %`; /*use return direactly if you want to return any dynamic value */
              },
            },
          },
        },
      },
      plugins: [gaugeNeedle],
    };

    canvas.chart = new Chart(ctx, config);

    return () => {
      if (canvas.chart) {
        canvas.chart.destroy();
        canvas.chart = null;
      }
    };
  }, []);
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <div className="chartCard">
          <div className="chartBox">
            <canvas id="myChart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};

export default Speedtwo;
