<script setup>
import { useRouter } from 'vue-router';

definePageMeta({
  title: "Dashboard",
  middleware: ["auth"],
  requiresAuth: true,
});

const data1 = ref([]);
const data2 = ref([]);
const data3 = ref([]);
const data4 = ref([]);
var sparkline1Data = [47, 45, 54, 38, 56, 24, 65];
var sparkline2Data = [61, 35, 66, 41, 59, 25, 32];
var sparkline3Data = [25, 18, 36, 41, 43, 35, 14];
var sparkline4Data = [8, 16, 22, 41, 43, 35, 14];

const changeKey = ref(0);

const customers = [
  {
    name: "Iqmal",
    age: "25",
    city: "Kuala Lumpur",
    country: "Malaysia",
    totalPurchase: 1524,
    purchase: 23,
  },
  {
    name: "Adi",
    age: "45",
    city: "Pulau Pinang",
    country: "Malaysia",
    totalPurchase: 643,
    purchase: 14,
  },
  {
    name: "Raziq",
    age: "21",
    city: "Kelantan",
    country: "Malaysia",
    totalPurchase: 543,
    purchase: 12,
  },
  {
    name: "Haqeem",
    age: "19",
    city: "Negeri Sembilan",
    country: "Malaysia",
    totalPurchase: 258,
    purchase: 6,
  },
];

const randomizeArray = function (arg) {
  var array = arg.slice();
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

data1.value.push({
  name: "Revenues",
  data: randomizeArray(sparkline1Data),
});

data2.value.push({
  name: "Users",
  data: randomizeArray(sparkline2Data),
});

data3.value.push({
  name: "Products",
  data: randomizeArray(sparkline3Data),
});

data4.value.push({
  name: "Viewers",
  data: randomizeArray(sparkline4Data),
});

const chartOptions = computed(() => ({
  chart: {
    type: "area",
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    curve: "smooth",
  },
  fill: {
    opacity: 1,
  },
  labels: [...Array(7).keys()].map((n) => `2022-06-0${n + 1}`),
  xaxis: {
    type: "datetime",
  },
}));

// Radial Chart

const radialData = ref([44, 55, 67, 83]);

const chartOptionsRadial = computed(() => ({
  chart: {
    height: 350,
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        style: {
          colors: "#9CA3AF",
        },
        name: {
          offsetY: 30,
          fontSize: "18px",
        },
        value: {
          offsetY: -15,
          fontSize: "30px",
        },
        total: {
          show: true,
          label: "Total",
          formatter: function (w) {
            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
            return 249;
          },
        },
      },
    },
  },
  labels: ["Product A", "Product B", "Product C", "Product D"],
  stroke: {
    lineCap: "round",
  },
}));

// Transaction Graph
const transactionData = ref([
  {
    name: "Alpha",
    data: [15, 12, 18, 10, 14, 16],
  },
  {
    name: "Beta",
    data: [10, 8, 12, 9, 11, 13],
  },
  {
    name: "Gamma",
    data: [5, 6, 7, 8, 9, 10],
  },
]);

const chartOptionsTransaction = computed(() => ({
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: [
      "Project Plan",
      "Design Specification",
      "Team Roster",
      "Requirements Document",
      "Test Plan",
      "User Manual",
    ],
  },
  yaxis: {
    title: {
      text: "Documents",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " documents";
      },
    },
  },
}));

const projectData = ref([
  {
    name: "Alpha",
    data: [30, 40, 45, 50, 49, 60, 70],
  },
  {
    name: "Beta",
    data: [20, 30, 35, 40, 39, 50, 60],
  },
  {
    name: "Gamma",
    data: [10, 20, 25, 30, 29, 40, 50],
  },
]);

const chartOptionsBar = computed(() => ({
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: [
      "2022-01-01",
      "2022-02-01",
      "2022-03-01",
      "2022-04-01",
      "2022-05-01",
      "2022-06-01",
      "2022-07-01",
    ],
  },
  yaxis: {
    title: {
      text: "Documents",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " documents";
      },
    },
  },
}));

const recentlyVisited = ref([
  { name: "Project Alpha", link: "/projects/alpha" },
  { name: "Project Beta", link: "/projects/beta" },
  { name: "Project Gamma", link: "/projects/gamma" },
]);

const quickAccess = ref([
  { name: "Dashboard", icon: "ic:outline-dashboard", link: "/dashboard" },
  { name: "Projects", icon: "ic:outline-folder", link: "/projects" },
  { name: "Documents", icon: "ic:outline-description", link: "/documents" },
  { name: "Settings", icon: "ic:outline-settings", link: "/settings" },
]);

const router = useRouter();

const navigateToProjectDocuments = (projectName) => {
  router.push({ path: '/document-management_v2', query: { project: projectName } });
};

onMounted(() => {
  setTimeout(() => {
    changeKey.value++;
  }, 500);
});
</script>

<template>
  <div>
    <LayoutsBreadcrumb />
    <!-- First Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-6">
      <!-- Summary Card #1 -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="ic:outline-folder-open"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
              3</span
            >
            <span class="text-base font-semibold text-gray-500"
              >Registered Projects</span
            >
          </div>
        </div>
      </rs-card>
      <!-- Summary Card #2 -->
      <rs-card>
        <div class="summary-2 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-indigo-100 rounded-2xl"
          >
            <Icon
              class="text-indigo-500"
              name="ic:outline-construction"
            ></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> 4</span>
            <span class="text-base font-semibold text-gray-500"
              > Project In Progress</span
            >
          </div>
        </div>
      </rs-card>
      <!-- Summary Card #3 -->
      <rs-card>
        <div class="summary-3 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-orange-100 rounded-2xl"
          >
            <Icon class="text-orange-500" name="ic:outline-upload"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> 20</span>
            <span class="text-base font-semibold text-gray-500"
              >Uploaded Files</span
            >
          </div>
        </div>
      </rs-card>
      <!-- Summary Card #4 -->
      <rs-card>
        <div class="summary-4 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-blue-100 rounded-2xl"
          >
            <Icon class="text-blue-500" name="ic:outline-check"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight">
            8</span
            >
            <span class="text-base font-semibold text-gray-500"
              >Completed Files</span
            >
          </div>
        </div>
      </rs-card>
    </div>

    <div class="flex flex-col md:flex-row gap-x-6">
      <div class="w-full md:w-8/12 flex flex-col">
        <!-- Graph -->
        <rs-card class="flex-1">
          <template #header> Transaction </template>
          <template #body>
            <client-only>
              <VueApexCharts
                :key="changeKey"
                width="100%"
                height="350"
                name="bar"
                :options="chartOptionsTransaction"
                :series="transactionData"
              ></VueApexCharts>
            </client-only>
          </template>
        </rs-card>
      </div>
      <div class="w-full md:w-4/12 flex flex-col">

        <!-- Recently Visited -->
        <rs-card class="flex-1">
          <template #header> Recently Visited </template>
          <template #body>
            <div class="flex flex-col gap-4">
              <div
                v-for="(item, index) in recentlyVisited"
                :key="index"
                class="flex items-center gap-4 p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                @click="navigateToProjectDocuments(item.name)"
              >
                <Icon name="ic:outline-history" class="text-primary" />
                <div class="flex-1">
                  <span class="font-semibold">{{ item.name }}</span>
                  <p class="text-sm text-gray-500">Last visited: 2 days ago</p>
                </div>
              </div>
            </div>
          </template>
        </rs-card>
      </div>
    </div>
  </div>
</template>
