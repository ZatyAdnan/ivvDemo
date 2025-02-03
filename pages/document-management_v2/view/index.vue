<template>
    <div>
        <LayoutsBreadcrumb />
        <!-- Document Viewer Section -->
        <div class="document-viewer border border-gray-300 p-4 rounded bg-gray-100 mt-2">
            <div class="document-details mb-2 flex justify-between items-center">
                <NuxtLink to="/document-management" class="rs-button flex items-center">
                    <Icon name="material-symbols:arrow-back-rounded" class="mr-2"></Icon>
                    Back to Document Management
                </NuxtLink>
                <div class="flex space-x-2">
                    <!-- Document Version Dropdown -->
                    <label for="documentVersion" class="text-sm mt-3">Version:</label>
                    <FormKit
                        type="select"
                        v-model="selectedVersion"
                        :options="documentVersions"
                        @change="updateDocumentVersion"
                    />
                    <rs-button @click="downloadDocument" class="flex items-center">
                        <Icon name="material-symbols:download-rounded" class="mr-2"></Icon>
                        Download Document
                    </rs-button>
                    <rs-button @click="downloadDocument" class="flex items-center">
                        <Icon name="material-symbols:download-rounded" class="mr-2"></Icon>
                        Download Result
                    </rs-button>
                </div>
            </div>
            <iframe :src="googleDocsViewerUrl" width="100%" height="450px"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            documentUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
            documentVersion: '1.0', // Replace with actual document version
            documentVersions: ['1.0', '1.1', '1.2'], // Replace with actual document versions
            selectedVersion: '1.0', // Default selected version
        };
    },
    computed: {
        googleDocsViewerUrl() {
            return `https://docs.google.com/gview?url=${this.documentUrl}&embedded=true`;
        }
    },
    methods: {
        downloadDocument() {
            const link = document.createElement('a');
            link.href = this.documentUrl;
            link.download = 'document.pdf'; // Replace with actual document name
            link.click();
        },
        updateDocumentVersion() {
            this.documentVersion = this.selectedVersion;
            // Update documentUrl based on the selected version if needed
        },
    },
};

definePageMeta({
    title: "Document Viewer",
    layout: "default",
    middleware: ["auth"], // Ensure only authenticated users can access
});
</script>
