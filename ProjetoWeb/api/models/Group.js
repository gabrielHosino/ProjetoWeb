module.exports = {
	attributes:{
		id: {
			type: 'integer',
			notNull: true
		},
		nome: {
			type: 'string',
			notNull: true
		},
		ownerid: {
			type: 'integer',
			notNull: true
		},
		relativeid: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true
		}
	}
};