var sql = require('sql');


exports.affluence_sensor_measurements = sql.define({
	name: 'measurements',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'id' },
		{ name: 'sensor_id' },
		{ name: 'type' },
		{ name: 'value' },
		{ name: 'date' }
	]
});


exports.lifecycle = sql.define({
	name: 'lifecycle',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' }
	]
});


exports.places = sql.define({
	name: 'places',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'id' },
		{ name: 'name' },
		{ name: 'type' },
		{ name: 'lat' },
		{ name: 'lon' }
	]
});


exports.sensors = sql.define({
	name: 'sensors',
	columns: [
		{ name: 'created_at' },
		{ name: 'updated_at' },
		{ name: 'id' },
		{ name: 'name' },
		{ name: 'installed_at' },
		{ name: 'project' },
		{ name: 'sim' },
		{ name: 'quipu_status' },
		{ name: 'sense_status' },
		{ name: 'latest_input' },
		{ name: 'latest_output' },
		{ name: 'signal' },
		{ name: 'data_period' },
		{ name: 'start_time' },
		{ name: 'stop_time' }
	]
});


