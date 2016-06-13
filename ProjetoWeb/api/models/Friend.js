module.exports = {
	attributes:{
		id: {
			type: 'integer',
			autoIncrement: true,
			primaryKey: true
		},
		follower: {
			type: 'integer',
			notNull: true
		},
		follows: {
			type: 'integer',
			notNull: true
		}
	}
}