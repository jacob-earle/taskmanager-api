// CRUD create read update delete

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
	if (error) {
		return console.log('Unable to connect to database!')
	}

	const db = client.db(databaseName)

	// db.collection('users').findOne({ _id: new ObjectID("60e081a41b8fe40aaf2d1924") }, (error, user) => {
	// 	if (error) {
	// 		console.log('Unable to find user')
	// 	}

	// 	console.log(user)
	// })

	// db.collection('users').find({age: 22}).toArray((error, users) => {
	// 	console.log(users)
	// })

	// db.collection('users').find({age: 22}).count((error, count) => {
	// 	console.log(count)
	// })

	// db.collection('tasks').findOne({_id: new ObjectID("60e07f782e47a90a8480d17f")}, (error, task) => {
	// 	if (error) {
	// 		return console.log('Unable to find task')
	// 	}
	// 	console.log(task)
	// })

	// db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
	// 	if (error) {
	// 		return console.log('Unable to find tasks')
	// 	}
	// 	console.log(tasks)
	// })

	// const updatePromise = db.collection('users').updateOne({
	// 	_id: new ObjectID("60e07d0749d3f80a6b8a7ff5")
	// }, {
	// 	$set: {
	// 		name: "Mike"
	// 	}
	// })

	// updatePromise.then((result) => {
	// 	console.log(result)
	// }).catch((error) => {
	// 	console.log(error)
	// })

	// db.collection('tasks').updateMany({}, {
	// 	$set: {
	// 		completed: true
	// 	}
	// }).then((result) => {
	// 	console.log(result)
	// }).catch((error) => {
	// 	console.log('Error!', error)
	// })

	// db.collection('users').deleteMany({
	// 	age: 27
	// }).then((result) => {
	// 	console.log(result)
	// }).catch((error) => {
	// 	console.log(error)
	// })

	// db.collection('tasks').deleteOne({
	// 	description: 'Do homework'
	// }).then((result) => {
	// 	console.log(result)
	// }).catch((error) => {
	// 	console.log(error)
	// })
})