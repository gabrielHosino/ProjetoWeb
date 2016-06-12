module.exports = {

  attributes: {   
	id: {
		type: 'integer',
		primaryKey: true,
		autoIncrement: true
	},
	title: {
    	type: 'string',
    	notNull: true
    },
    text: {
    	type: 'string',
    	notNull: true
    },
    timestamp:{
    	type: 'timestamp',
    	notNull: true
    },
    user: 
        model: 'clients',
        required: true,
        notNull: true
	
  }
};