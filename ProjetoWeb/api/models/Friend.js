module.exports = {
	attributes:{
		id: {
			type: 'integer',
			primaryKey: true,
			autIncrement: true
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