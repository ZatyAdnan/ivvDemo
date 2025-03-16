<template>
    <div>
        <LayoutsBreadcrumb />
        <!-- Document Viewer Section -->
        <div class="document-viewer border border-gray-300 p-4 rounded bg-gray-100 mt-2">
            <div class="document-details mb-2 flex justify-between items-center">
                <NuxtLink to="/ivv/projects/document/1" class="rs-button flex items-center">
                    <Icon name="material-symbols:arrow-back-rounded" class="mr-2"></Icon>
                    Kembali ke Pengurusan Dokumen
                </NuxtLink>
                <div class="flex space-x-2">
                    <!-- Document Version Dropdown -->
                    <!-- <label for="documentVersion" class="text-sm mt-3">Versi: 1 </label> -->
                    
                    <rs-button @click="downloadDocument" class="flex items-center">
                        <Icon name="material-symbols:download-rounded" class="mr-2"></Icon>
                        Muat Turun Dokumen
                    </rs-button>
                    <rs-button @click="downloadDocument" class="flex items-center">
                        <Icon name="material-symbols:download-rounded" class="mr-2"></Icon>
                        Muat Turun Keputusan
                    </rs-button>
                </div>
            </div>
            <iframe :src="googleDocsViewerUrl" width="100%" height="650px"></iframe>
        </div>
    </div>
</template>

<script>
// definePageMeta({
//     title: "Paparan Dokumen",
//     layout: "default",
//     middleware: ["auth"], // Memastikan hanya pengguna yang disahkan boleh mengakses
// });
export default {
    data() {
        return {
            documentUrl: '/doc/SDS.pdf',
            documentVersion: '1.0',
            documentVersions: ['1.0', '1.1', '1.2'],
            selectedVersion: '1.0',
        };
    },
    computed: {
        googleDocsViewerUrl() {
            const baseUrl = window.location.origin;
            const fullUrl = `${baseUrl}${this.documentUrl}`;
            // console.log('URL PDF:', fullUrl);
            return `https://docs.google.com/gview?url=${encodeURIComponent(fullUrl)}&embedded=true`;
        }
    },
    methods: {
        downloadDocument() {
            const link = document.createElement('a');
            link.href = this.documentUrl;
            link.download = 'dokumen.pdf'; // Nama fail yang akan dimuat turun
            link.click();
        },
        updateDocumentVersion() {
            this.documentVersion = this.selectedVersion;
            // Kemaskini documentUrl berdasarkan versi yang dipilih jika perlu
        },
    },
};


</script>
