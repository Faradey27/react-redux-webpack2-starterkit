// import { CALL_API } from 'redux-api-middleware'; TODO should replace CALL_MOCK_API, when real api will appear
import { schema } from 'normalizr';
import { CALL_MOCK_API } from './../../mockApi';
import { API_URL } from './../../constants/Api';
import { APPS_VIEW_STATE } from './../../constants/ViewStates';
import { APPS } from './../../constants/MappersTypes';
import schemaUtils from './../../utils/schemaUtils';
import appSchema from './../../schemas/app';

const hash = {
  [APPS_VIEW_STATE]: {
    schema: new schema.Array(appSchema),
    viewId: APPS_VIEW_STATE,
    mapperType: APPS,
    mockResponse: [
      {
        name: 'App1',
        title: 'This is first app title',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin`,
      },
      {
        name: 'App2',
        title: 'This is second app title',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin`,
      },
    ],
  },
};


export const LOAD_ENTITIES_START = 'LOAD_ENTITIES_START';
export const LOAD_ENTITIES_SUCCESS = 'LOAD_ENTITIES_SUCCESS';
export const LOAD_ENTITIES_FAILURE = 'LOAD_ENTITIES_FAILURE';

const fetchEntities = ({ href, type }) => {
  const infoAboutEntity = hash[type] || {};
  const meta = { viewId: infoAboutEntity.viewId, mapperType: infoAboutEntity.mapperType };

  return {
    [CALL_MOCK_API]: {
      types: [
        { type: LOAD_ENTITIES_START, meta },
        schemaUtils.getSuccessActionTypeWithSchema({
          type: LOAD_ENTITIES_SUCCESS,
          schema: infoAboutEntity.schema,
          meta,
        }),
        { type: LOAD_ENTITIES_FAILURE, meta },
      ],
      method: 'GET',
      mockResponse: {
        responseJSON: infoAboutEntity.mockResponse,
      },
      endpoint: `${API_URL}${href}`,
    },
  };
};

export const loadEntities = ({ href, type }) => (dispatch) => dispatch(fetchEntities({ href, type }));
