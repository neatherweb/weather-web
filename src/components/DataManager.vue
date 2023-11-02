<script setup>
import { useToast } from 'primevue/usetoast';
const toast = useToast();
import DataManager from './dataManager/HOBOLinkLib';

function ErrorHandler(event) {
    console.log('ErrorHandler: Received error event= ' + event);
    toast.add({
        severity: 'error',
        summary: 'Disconnected',
        detail: 'Lost connection to weather data service. Reload the page to try again.',
        life: 4000,
    });
}
function TSDataUpdater(data) {
    console.log('TSDataUpdater: data.length=' + data.length);
    console.dir(data);
}
function LiveDataUpdater(data) {
    console.log('LiveDataUpdater: data.length=' + data.length);
    console.dir(data);
    if (data.length > 0) {
        console.log(`Latest station data as of: ${new Date(data[0].date)}`);
    }
}

console.log('Starting WSS connection');
const conn = new WebSocket(
    'wss://api-onset-prod.scriptrapps.io//RThGMDEzNDc3NA=='
);
const dm = new DataManager(conn, TSDataUpdater, LiveDataUpdater, ErrorHandler);
conn.onopen = function (event) {
    console.log(event);
    console.log('Successfully connected to the websocket server...');
    toast.add({
        severity: 'success',
        summary: 'Connected',
        detail: 'Connected to weather data service',
        life: 2000,
    });
    const currentTime = Date.now();
    dm.RequestTSData(
        'ts-all',
        [dm.Streams.WindSpeed, dm.Streams.GustSpeed, dm.Streams.WindDirection],
        currentTime - 1000 * 3600,
        currentTime
    );
    dm.RequestLatestData('latest-ws', dm.Streams.WindSpeed);
};

import { useStore } from 'vuex';
const store = useStore();
store.commit('setConn', conn);
</script>

<template>
    <Toast />
</template>
