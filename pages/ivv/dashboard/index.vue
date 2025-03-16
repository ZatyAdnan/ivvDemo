<template>
    <div class="p-6 space-y-6">
        <!-- project data  -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <rs-card>
                <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                    <div
                        class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
                    >
                        <Icon class="text-primary" name="material-symbols:folder-outline"></Icon>
                    </div>
                    <div class="flex-1 truncate">
                        <span class="block font-semibold text-xl leading-tight">
                        4</span
                        >
                        <span class="text-base font-semibold text-gray-500"
                        >Registered Projects</span
                        >
                    </div>
                </div>
            </rs-card>
            <rs-card>
                <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                    <div
                        class="p-5 flex justify-center items-center bg-success/20 rounded-2xl"
                    >
                        <Icon class="text-primary" name="material-symbols:folder-check-outline"></Icon>
                    </div>
                    <div class="flex-1 truncate">
                        <span class="block font-semibold text-xl leading-tight">
                        2</span
                        >
                        <span class="text-base font-semibold text-gray-500"
                        >Completed Projects</span
                        >
                    </div>
                </div>
            </rs-card>
            <rs-card>
                <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                    <div
                        class="p-5 flex justify-center items-center bg-warning/20 rounded-2xl"
                    >
                        <Icon class="text-primary" name="material-symbols:folder-eye-outline"></Icon>
                    </div>
                    <div class="flex-1 truncate">
                        <span class="block font-semibold text-xl leading-tight">
                        1</span
                        >
                        <span class="text-base font-semibold text-gray-500"
                        > On Going Projects</span
                        >
                    </div>
                </div>
            </rs-card>
            <rs-card>
                <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                    <div
                        class="p-5 flex justify-center items-center bg-danger rounded-2xl"
                    >
                        <Icon class="text-primary" name="mingcute:folder-warning-line"></Icon>
                    </div>
                    <div class="flex-1 truncate">
                        <span class="block font-semibold text-xl leading-tight">
                        1</span
                        >
                        <span class="text-base font-semibold text-gray-500"
                        > Problem Projects</span
                        >
                    </div>
                </div>
            </rs-card>
        </div>

        <!-- documents data -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <rs-card>
                <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                    <div
                        class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
                    >
                        <Icon class="text-primary" name="material-symbols:file-copy-outline-rounded"></Icon>
                    </div>
                    <div class="flex-1 truncate">
                        <span class="block font-semibold text-xl leading-tight">
                        4</span
                        >
                        <span class="text-base font-semibold text-gray-500"
                        >Jumlah Dokumen</span
                        >
                    </div>
                </div>
            </rs-card>
            <rs-card>
                <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                    <div
                        class="p-5 flex justify-center items-center bg-warning/20 rounded-2xl"
                    >
                        <Icon class="text-primary" name="material-symbols:lab-profile-outline"></Icon>
                    </div>
                    <div class="flex-1 truncate">
                        <span class="block font-semibold text-xl leading-tight">
                        2</span
                        >
                        <span class="text-base font-semibold text-gray-500"
                        >Dokumen menunggu </span
                        >
                    </div>
                </div>
            </rs-card>            
            <rs-card>
                <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                    <div
                        class="p-5 flex justify-center items-center bg-danger rounded-2xl"
                    >
                        <Icon class="text-primary" name="mingcute:file-warning-line"></Icon>
                    </div>
                    <div class="flex-1 truncate">
                        <span class="block font-semibold text-xl leading-tight">
                        1</span
                        >
                        <span class="text-base font-semibold text-gray-500"
                        > Lambat Hantar</span
                        >
                    </div>
                </div>
            </rs-card>
        </div>

        <!-- graph  -->
        <div class="flex flex-col md:flex-row gap-x-6">
            <div class="w-12/2 md:w-8/12 flex flex-col">
                <!-- Graph -->
                <rs-card class="flex-1">
                    <template #header> Jumlah Dokumen Disemak </template>
                    <template #body>
                        <client-only>
                        <VueApexCharts
                            :key="changeKey"
                            width="100%"
                            height="300"
                            name="area"
                            :options="chartOptionsTransaction"
                            :series="transactionData"
                        ></VueApexCharts
                        ></client-only>
                    </template>
                </rs-card>
            </div>
            <div class="w-12/2 md:w-4/12 flex flex-col">
                <!-- Monthly Target Radial -->
                <rs-card class="flex-1">
                <template #header> Dokumen yang dimuatnaik </template>
                <template #body>
                    <client-only>
                        <VueApexCharts
                            :key="changeKey"
                            width="100%"
                            height="300"
                            name="radialBar"
                            :options="chartOptionsRadial"
                            :series="radialData"
                        ></VueApexCharts>
                    </client-only>                    
                </template>
                </rs-card>
            </div>
        </div>

        <!-- list -->
        <rs-card class="">
            <template #header> Aktiviti terakhir </template>
            <template #body>
                <div
                v-for="(val, index) in projects"
                :key="index"
                class="flex justify-between items-center rounded-lg bg-[rgb(var(--bg-1))] p-5 first:mt-0 mt-3"
                >
                <div class="flex items-center gap-x-4">
                    <button class="flex items-center p-4 rounded-full  shadow-md" v-if="val.status === 'Muatnaik Dokumen'" >
                        <Icon size="20px" name="streamline:interface-upload-laptop-arrow-computer-download-internet-laptop-network-server-up-upload"></Icon>
                    </button>
                    <button class="flex items-center p-4 rounded-full  shadow-md" v-else>
                        <Icon size="20px" name="fluent:document-checkmark-16-filled"></Icon>
                    </button>
                    <div class="flex-1">
                    <div class="flex flex-col">
                        <span
                        class="text-gray-900 dark:text-white font-semibold text-lg"
                        >
                        {{ val.name }}
                        </span>
                        <span class="text-gray-600 dark:text-gray-50 text-sm">
                        <!-- RM{{ parseFloat(val.doc_type).toFixed(2) }} | -->
                        Jenis Dokumen: {{ val.doc_type }}  |
                        {{ val.status }} 
                        </span>
                    </div>
                    </div>
                </div>
                <div>
                    <button
                    class="flex items-center p-4 rounded-full bg-[rgb(var(--bg-2))] hover:bg-[rgb(var(--bg-2))]/10 shadow-md"
                    >
                    <Icon size="20px" name="iconamoon:eye"></Icon>
                    </button>
                </div>
                </div>
            </template>
        </rs-card>
      
    </div>
</template>
  

<script setup>
    definePageMeta({
    title: "Dashboard",
    layout: "default",
    middleware: ["auth"],
    });
    
    const projects = [
        {
            name: "Sistem NIISe Modul Pengurusan Keselamatan Sub Modul Forensik",
            doc_id: 1,
            project_id: 1,
            doc_type: 'SRS',
            status: 'Muatnaik Dokumen',
        },
        {
            name: "Sistem Pendaftaran Pekerjaan Suruhanjaya Perkhidmatan Awam",
            doc_id: 2,
            project_id: 2,
            doc_type: "SDS",
            status: 'Membuat Semakan',
        },
        {
            name: "MySejahtera",
            doc_id: 3,
            project_id: 3,
            doc_type: "URS",
            status: 'Muatnaik Dokumen',
        },
        {
            name: "Sistem Jom Masuk Tentera",
            doc_id: 4,
            project_id: 4,
            doc_type: "User Manual",
            status: 'Membuat Semakan',
        },
    ];
    // Radial Chart

    const radialData = ref([1, 2, 0, 0]);

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
                return 4;
            },
            },
        },
        },
    },
    labels: ['URS', 'SRS', 'SDS', 'User Manual', 'Test Script'],
    stroke: {
        lineCap: "round",
    },
    }));

    // Transaction Graph
    const transactionData = ref([
    {
        name: "URS",
        data: [2,0,0,0,0,0,0,0,0,0,0,0,0],
    },
    {
        name: "SRS",
        data: [0,2,0,0,0,0,0,0,0,0,0,0,0],
    },
    {
        name: "SDS",
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0],
    },
    {
        name: "Test Script",
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0],
    },
    {
        name: "User Manual",
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0],
    },
    ]);

    const chartOptionsTransaction = computed(() => ({
    chart: {
        height: 350,
        type: "area",
        toolbar: {
        show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: "smooth",
    },
    colors: ["#ec4899","#6366F1", "#F97316","#c084fc","#2dd4bf","#facc15"],
    yaxis: {
        labels: {
        style: {
            colors: "#9CA3AF",
            fontSize: "12px",
        },
        },
    },
    xaxis: {
        type: "datetime",
        categories: [
        "2022-01-01",
        "2022-02-01",
        "2022-03-01",
        "2022-04-01",
        "2022-05-01",
        "2022-06-01",
        "2022-07-01",
        "2022-08-01",
        "2022-09-01",
        "2022-10-01",
        "2022-11-01",
        "2022-12-01",
        ],
        labels: {
        style: {
            colors: "#9CA3AF",
            fontSize: "14px",
            fontWeight: 400,
        },
        datetimeFormatter: {
            month: "MMM",
        },
        },
    },
    legend: {
        position: "top",
        horizontalAlign: "left",
        labels: {
        colors: "#9CA3AF",
        useSeriesColors: false,
        },
    },
    tooltip: {
        x: {
        format: "MMMM",
        },
    },
    }));

    onMounted(() => {
    setTimeout(() => {
        changeKey.value++;
    }, 500);
    });
</script>

<style lang="scss" scoped>

</style>