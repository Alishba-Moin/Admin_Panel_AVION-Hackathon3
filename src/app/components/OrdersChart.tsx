"use client";

// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartOptions,
// } from "chart.js";

// // Register required chart components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // Define TypeScript type for `items`
// interface Item {
//   date: string;
//   data: {
//     totalOrders: number;
//   };
// }

// // Explicitly type `items` as an array of `Item`
// export default function OrdersChart({ items }: { items: Item[] }) {
//   const data = {
//     labels: items?.map((item) => item?.date),
//     datasets: [
//       {
//         label: "Orders",
//         data: items?.map((item) => item?.data?.totalOrders),
//         backgroundColor: "#879fff20",
//         borderColor: "#879fff80",
//         borderWidth: 0.5,
//         barThickness: 30,
//       },
//     ],
//   };

//   // Explicitly type `options` as `ChartOptions<"bar">`
//   const options: ChartOptions<"bar"> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top", // ✅ Type is now correctly inferred
//       },
//       title: {
//         display: true,
//         text: "Total Order Bar Chart",
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <section className="bg-white p-5 rounded-xl shadow w-full h-[430px]">
//       <Bar data={data} options={options} />
//     </section>
//   );
// }


import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface OrderItem {
  date: string;
  totalOrders: number;
}

export default function OrdersChart({ items }: { items: OrderItem[] }) {
  // 🛠️ Correctly extracting totalOrders
  const data = {
    labels: items?.map((item) => item?.date),
    datasets: [
      {
        label: "Orders",
        data: items?.map((item) => item?.totalOrders || 0), // ✅ Ensures no undefined values
        backgroundColor: "rgba(135, 159, 255, 0.2)",
        borderColor: "rgba(135, 159, 255, 0.8)",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  };

  // 🛠️ Updated chart options
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Order Bar Chart",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <section className="bg-white p-5 rounded-xl shadow w-full h-[430px]">
      <Bar data={data} options={options} />
    </section>
  );
}
