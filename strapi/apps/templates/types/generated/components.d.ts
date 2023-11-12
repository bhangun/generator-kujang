import type { Schema, Attribute } from '@strapi/strapi';

export interface GroupProject extends Schema.Component {
  collectionName: 'components_group_projects';
  info: {
    displayName: 'Project';
    icon: 'archive';
  };
  attributes: {
    name: Attribute.String;
  };
}

export interface GroupTeam extends Schema.Component {
  collectionName: 'components_group_teams';
  info: {
    displayName: 'Team';
    icon: 'alien';
  };
  attributes: {
    name: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'group.project': GroupProject;
      'group.team': GroupTeam;
    }
  }
}
