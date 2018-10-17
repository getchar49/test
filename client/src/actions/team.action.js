import constants from "@/constants";
import { teamService } from "./services";

export default {
  /**
   * Local
   */
  switchTeam: teamId => async dispatch => {
    dispatch({
      type: constants.TEAM_SWITCH,
      payload: teamId
    });
  },

  /**
   * fetch API with Axios
   */
  fetchCreateTeam: teamFormInfo => async dispatch => {
    dispatch({
      type: constants.TEAM_FETCH_CREATE
    });
    try {
      const response = await teamService.fetchCreateTeam(teamFormInfo);
      const { data } = response;
      dispatch({
        type: constants.TEAM_FETCH_CREATE_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_TEAM,
        payload: data.meta.message
      });
    }
  },

  fetchTeamAssociatedList: teamId => async dispatch => {
    dispatch({
      type: constants.TEAM_FETCH_ASSOCIATED_LIST
    });
    try {
      const response = await teamService.fetchTeamAssociatedList(teamId);
      const { data } = response;
      dispatch({
        type: constants.TEAM_FETCH_ASSOCIATED_LIST_SUCCESS,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.ERROR_TEAM,
        payload: data.meta.message
      });
    }
  },

  /**
   * Web Socket with Socket.io
   */
  emitSocketAddTeamMember: addMemberData => {
    teamService.emitSocketAddTeamMember(addMemberData);
  },

  // pass in dispatch, let socket.io dispatch dispatchReceivedTeamMember when data is received
  receiveSocketNewTeamMember: () => dispatch => {
    teamService.receiveSocketNewTeamMember(dispatch);
  },

  dispatchReceivedTeamMember: data => dispatch => {
    if (data.meta.type === "success") {
      dispatch({
        type: constants.TEAM_SOCKET_RECEIVE_NEW_MEMBER,
        payload: data
      });
    } else {
      dispatch({
        type: constants.ERROR_TEAM,
        payload: data.meta.message
      });
    }
  }
};
