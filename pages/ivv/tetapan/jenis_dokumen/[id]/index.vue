<template>
    <Breadcrumb />
    <div class="p-4">
        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold mb-6">Kemaskini Jenis Dokumen</h2>
            
            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Nama Dokumen <span class="text-red-500">*</span>
                    </label>
                    <input 
                        v-model="formData.nama_dokumen"
                        type="text"
                        required
                        class="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Masukkan nama dokumen"
                    />
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Kriteria Minima <span class="text-red-500">*</span>
                    </label>
                    <textarea
                        v-model="formData.kriteria_minima"
                        rows="20"
                        required
                        class="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Masukkan kriteria minima"
                    ></textarea>
                </div>

                <div class="flex justify-end">
                    <button
                        type="submit"
                        :disabled="!isFormValid"
                        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
    title: "Tetapan",
    middleware: ["auth"],
    breadcrumb: [
        {
            name: "Kemaskini Jenis Dokumen",
            type: "current",
        },
    ],
});

const route = useRoute()
const formData = ref({
    nama_dokumen: 'SRS',
    kriteria_minima: 'gjhgfjfjkjf'
})

const isFormValid = computed(() => {
    return formData.value.nama_dokumen.trim() !== '' && 
           formData.value.kriteria_minima.trim() !== ''
})

// Fungsi untuk mendapatkan data semasa
const fetchCurrentData = async () => {
    try {
        // Gantikan dengan panggilan API sebenar
        const response = await fetch(`/api/jenis-dokumen/${route.params.id}`)
        const data = await response.json()
        formData.value = {
            nama_dokumen: data.nama_dokumen,
            kriteria_minima: data.kriteria_minima
        }
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

// Fungsi untuk mengemaskini data
const handleSubmit = async () => {
    try {
        // Gantikan dengan panggilan API sebenar
        await fetch(`/api/jenis-dokumen/${route.params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData.value)
        })
        // Tunjukkan notifikasi berjaya
        alert('Data berjaya dikemaskini')
    } catch (error) {
        console.error('Error updating data:', error)
        alert('Ralat semasa mengemaskini data')
    }
}

onMounted(() => {
    fetchCurrentData()
})
</script>

<style lang="scss" scoped>
// Styling tambahan jika diperlukan
</style>