<template>
    <div class="card">
        <Toast />
        <Panel header="Wind speed" toggleable>
            <template #icons>
                <button class="p-panel-header-icon p-link mr-2" @click="toggle">
                    <span class="pi pi-cog"></span>
                </button>
                <Menu ref="menu" id="config_menu" :model="items" popup="true" />
            </template>
            <Chart
                type="line"
                :data="windSpeedData"
                :options="windSpeedOptions"
                class="h-30rem"
            />
        </Panel>
        <Panel header="Wind direction" toggleable>
            <template #icons>
                <button class="p-panel-header-icon p-link mr-2" @click="toggle">
                    <span class="pi pi-cog"></span>
                </button>
                <Menu ref="menu" id="config_menu" :model="items" popup="true" />
            </template>
            <Chart
                type="line"
                :data="windDirectionData"
                :options="windDirectionOptions"
                class="h-30rem"
            />
        </Panel>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Chart from 'primevue/chart';

const store = useStore();

const menu = ref();
const toast = useToast();
const router = useRouter();

const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    toast.add({
                        severity: 'success',
                        summary: 'Updated',
                        detail: 'Data Updated',
                        life: 3000,
                    });
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    toast.add({
                        severity: 'warn',
                        summary: 'Delete',
                        detail: 'Data Deleted',
                        life: 3000,
                    });
                },
            },
        ],
    },
    {
        label: 'Navigate',
        items: [
            {
                label: 'Vue Website',
                icon: 'pi pi-external-link',
                url: 'https://vuejs.org/',
            },
            {
                label: 'Router',
                icon: 'pi pi-upload',
                to: '/fileupload',
            },
        ],
    },
]);

const toggle = (event) => {
    menu.value.toggle(event);
};

const save = () => {
    toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Data Saved',
        life: 3000,
    });
};

onMounted(() => {
    windSpeedData.value = setWindSpeedData();
    windSpeedOptions.value = setWindSpeedOptions();
    windDirectionData.value = setWindDirectionData();
    windDirectionOptions.value = setWindDirectionOptions();
});

const windSpeedData = ref();
const windSpeedOptions = ref();
const windDirectionData = ref();
const windDirectionOptions = ref();

const setWindSpeedData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['09:00', '09:10', '09:20', '09:30', '09:40', '09:50', '10:00'],
        datasets: [
            {
                label: 'Wind speed',
                data: [8.4, 9.1, 9.1, 8.4, 7.1, 7.8, 7.1, 8.4, 6.5, 6.5],
                fill: true,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4,
            },
            {
                label: 'Gust speed',
                data: [9.1, 10.4, 10.4, 10.4, 8.4, 8.4, 9.1, 10.4, 8.4, 9.1],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0.4,
            },
        ],
    };
};
const setWindSpeedOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
            y: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
        },
    };
};

const setWindDirectionData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['09:00', '09:10', '09:20', '09:30', '09:40', '09:50', '10:00'],
        datasets: [
            {
                label: 'Wind direction',
                data: [37, 27, 32, 31, 31, 34, 34, 27, 22, 25],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--green-500'),
                tension: 0.4,
            },
        ],
    };
};
const setWindDirectionOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
            y: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
        },
    };
};
</script>
