'use strict';

import models from '../../../../db/models'
import { PROVIDE_TABLE_NAME } from '../../../../messages';
import { capitalize, camelCase } from 'lodash';
import pluralize from 'pluralize';
import { Sequelize, DataTypes } from 'sequelize';
/**
 * Get sequelize model of table.
 * @param {string} table - Table name of model.
 * @returns {object} Sequelize model.
 */
export const getModel = (table = '') => {
	if (table.length === 0) {
		throw new Error(PROVIDE_TABLE_NAME);
	}

	if (table !== 'sequelize') {
		table = table
			.split(' ')
			.map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
			.join('');
	}

	return models[table];
};

export const create = (table, query = {}, options = {}) => {
	return getModel(table).create(query, options);
};

export const destroy = (table, query = {}, options = {}) => {
	return getModel(table).destroy(query, options);
};

export const update = (table, query = {}, options = {}) => {
	return getModel(table).update(query, options);
};

export const createModel = (
	name,
	properties = {},
	options = {
		timestamps: true,
		underscored: true
	}
) => {
	const table = name
		.split(' ')
		.map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
		.join('');

	if (models[table]) return models[table];

	const modelProperties = {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	};

	for (let prop in properties) {
		if (!properties[prop].type) {
			throw new Error('Type not given for property ' + prop);
		}
		properties[prop].type = DataTypes[properties[prop].type.toUpperCase()];
		modelProperties[prop] = properties[prop];
	}
	const model = models.sequelize.define(
		name.split(' ').map((word) => `${capitalize(word)}`).join(''),
		modelProperties,
		{
			timestamps: true,
			underscored: true,
			tableName: pluralize(name.split(' ').map((word) => `${capitalize(word)}`).join('')),
			...options
		}
	);
	return model;
};

export const associateModel = (model, association, associatedModel, options = {}) => {
	model.associate = (models) => {
		model[camelCase(association)](models[associatedModel.split(' ').map((word) => `${capitalize(word)}`).join('')], options);
	};

	model.associate(models);
};

export default {
	createModel,
	associateModel,
	getModel,
	create,
	destroy,
	update,
	models
};