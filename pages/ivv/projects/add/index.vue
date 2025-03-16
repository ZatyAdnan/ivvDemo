<script setup>
    import { useRouter } from 'vue-router';
    import Breadcrumb from '~/components/Breadcrumb.vue';
    definePageMeta({
        title: "Projek",
        middleware: ["auth"],
        breadcrumb: [
            {
                name: "Tambah Projek",
                type: "current",
            },
        ],
    });
    const router = useRouter();

    const handleSubmit = async (formData) => {
        try {
            console.log('Form submitted:', formData);
            // Add your submission logic here
            // router.push('/ivv/projects');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleCancel = () => {
        router.push('/ivv/projects');
    };
</script>

<template>
    <Breadcrumb />
    <div class="space-y-4">
        <!-- <h2 class="form-title">Project Registration</h2> -->
        <rs-card class="px-4 py-4">
            <FormKit type="form" @submit="handleSubmit" #default="{ value }">
                <!-- Maklumat Asas Projek -->
                <div class="form-section">
                    <h3>Maklumat Asas</h3>
                    
                    <FormKit type="text" name="projectName" label="Nama Projek" validation="required" placeholder="Masukkan nama projek" />

                    <FormKit type="text" name="projectCode" label="Kod Projek" validation="required" placeholder="cth., PRJ-2024-001" />           
                
                    <FormKit type="textarea" name="description" label="Skop Projek" placeholder="Masukkan skop projek" rows="4" />
                </div>

                <!-- Butiran Projek -->
                <div class="form-section">
                    <h3>Butiran Projek</h3>

                    <FormKit type="select" name="contractor" label="Kontraktor" validation="required" placeholder="Pilih kontraktor"
                        :options="{
                            contractor1: 'Syarikat Kontraktor A Sdn Bhd',
                            contractor2: 'Syarikat Kontraktor B Sdn Bhd',
                            contractor3: 'Syarikat Kontraktor C Sdn Bhd',
                            contractor4: 'Syarikat Kontraktor D Sdn Bhd'
                        }"
                    />
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormKit type="date" name="startDate" label="Tarikh Mula" validation="required" />

                        <FormKit type="date" name="endDate" label="Tarikh Jangka Siap" validation="required" />
                    </div>

                    <FormKit type="select" name="status" label="Status Projek"
                        :options="{
                            planning: 'Perancangan',
                            ongoing: 'Sedang Berjalan',
                            completed: 'Selesai',
                            onHold: 'Ditangguhkan'
                        }"
                    />

                    <FormKit type="number" name="budget" label="Bajet (MYR)" validation="min:0" step="0.01" placeholder="Masukkan bajet projek" />
                </div>

                <!-- Maklumat Perhubungan -->
                <div class="form-section">
                    <h3>Maklumat Perhubungan</h3>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormKit type="text" name="projectManager" label="Pengurus Projek" validation="required" placeholder="Masukkan nama pengurus projek" />

                        <FormKit type="email" name="email" label="Emel" validation="required|email" placeholder="Masukkan alamat emel" />

                        <FormKit type="tel" name="phone" label="No. Telefon" placeholder="Masukkan nombor telefon" />
                    </div>
                </div>

                <div class="form-actions">
                    <FormKit
                        type="submit"
                        label="Hantar"
                        input-class="btn-submit"
                    />
                    <FormKit
                        type="button"
                        label="Batal"
                        input-class="btn-cancel"
                        @click="handleCancel"
                    />
                </div>

                <div ></div>
            </FormKit>
        </rs-card>
    </div>
</template>


<style lang="scss" scoped>
    .project-form-container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 2rem;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .form-title {
        text-align: center;
        margin-bottom: 2rem;
        color: #333;
    }

    .form-section {
        margin-bottom: 2rem;
        
        h3 {
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #eee;
        }
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;

        :deep(.btn-submit) {
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            font-weight: 500;
            cursor: pointer;
            background-color: #4a90e2;
            color: white;
            border: none;
            transition: background-color 0.3s;

            &:hover {
                background-color: #357abd;
            }
        }

        :deep(.btn-cancel) {
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            font-weight: 500;
            cursor: pointer;
            background-color: #fff;
            color: #666;
            border: 1px solid #ddd;
            transition: background-color 0.3s;

            &:hover {
                background-color: #f5f5f5;
            }
        }
    }
</style>