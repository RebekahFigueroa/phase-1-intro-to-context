// Your code here
function createEmployeeRecord(array) {
	const [firstName, familyName, title, payPerHour] = array;
	return {
		firstName: firstName,
		familyName: familyName,
		title: title,
		payPerHour: payPerHour,
		timeInEvents: [],
		timeOutEvents: [],
	};
}

function createEmployeeRecords(arrays) {
	return arrays.map((array) => createEmployeeRecord(array));
}

function createTimeInEvent(objectEmployeeRecord, stringDateStamp) {
	const timeSplit = stringDateStamp.split(" ");
	objectEmployeeRecord.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(timeSplit[1], 10),
		date: timeSplit[0],
	});
	return objectEmployeeRecord;
}

function createTimeOutEvent(objectEmployeeRecord, stringDateStamp) {
	const timeSplit = stringDateStamp.split(" ");
	objectEmployeeRecord.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(timeSplit[1], 10),
		date: timeSplit[0],
	});
	return objectEmployeeRecord;
}

function hoursWorkedOnDate(objectEmployeeRecord, stringDate) {
	const timeInEvent = objectEmployeeRecord.timeInEvents.find(
		(event) => event.date === stringDate
	);
	const timeOutEvent = objectEmployeeRecord.timeOutEvents.find(
		(event) => event.date === stringDate
	);
	return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(objectEmployeeRecord, stringDate) {
	const hours = hoursWorkedOnDate(objectEmployeeRecord, stringDate);
	return hours * objectEmployeeRecord.payPerHour;
}

function allWagesFor(objectEmployeeRecord) {
	const dates = objectEmployeeRecord.timeInEvents.map((event) => event.date);
	return dates.reduce(
		(total, date) => total + wagesEarnedOnDate(objectEmployeeRecord, date),
		0
	);
}

function calculatePayroll(arrayEmployeeRecords) {
	return arrayEmployeeRecords.reduce(
		(total, employeeRecord) => total + allWagesFor(employeeRecord),
		0
	);
}
