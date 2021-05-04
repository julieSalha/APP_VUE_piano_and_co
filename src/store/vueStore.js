import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: undefined,
        statusLogged: false,
        myTracks : [],
        interpretations : [],
        interpretationToEdit: {},
        comments: []
    },
    
    getters: {
        getUser(state){ return state.user }
    },

    mutations: {
        USER( state, payload ){ state.user = payload.data },
        LOGGED( state ){ state.statusLogged = true },
        MY_TRACKS( state, payload ){ 
          const myTracks = [];
          for (const item of payload.data) {
            if (item.user === state.user._id) {
              myTracks.push(item);
            }
          }
          state.myTracks = myTracks;
         },
        TRACK( state, payload ){ state.myTracks.push(payload.data) },
        DELETE_TRACK(state, id){
          const index = state.myTracks.findIndex(track => track.id === id)
          state.myTracks.splice(index, 1)
        }, 
        UPDATE_TRACK(state, data){
          const index = state.myTracks.findIndex(track => track.id === data.id)
          state.myTracks[index] = data.payload;
        },
        INTERPRETATION_TO_EDIT(state, payload){ state.interpretationToEdit = payload },
        INTERPRETATIONS( state, payload ){ state.interpretations = payload },
        // UPDATE_LIKES_INTERPRETATION(state, payload){
        //   const index = state.interpretations.findIndex(interpretation => interpretation._id === payload.subjectOf)
        //   //console.log('index',index);
        //   state.interpretations[index][1].push(payload);
        // },
        UPDATE_INTERPRETATION_COMMENT(state, data){
          let idInterpretation;
          for (const item of state.interpretations) {
            if (item[0]._id === data.subjectOf) {
              idInterpretation = item[0]._id;
            }
          }
          const index = state.interpretations.findIndex(interpretation => interpretation.id === idInterpretation)
          state.interpretations[index][1].push(data);
        },   
        COMMENTS(state, payload) { state.comments = payload.data },
        DELETE_COMMENT(state, id) {
          /*let itemDelete;
          for (const item of state.comments) {
            if (item._id === id) {
              itemDelete = item;
            }
          }*/

          //const index = indexOf(itemDelete);
          //state.comments.splice(index, 1)

          //let deleteCo = state.comments.find(comment => comment._id === id);
          //deleteCo = {};
        }      
    },

    actions: {
        async registerUser(context, data){
          try {
              const apiResponse = await axios.post(
                'http://localhost:9966/auth/register', 
                { 
                  givenName : data.givenName, 
                  familyName : data.familyName,
                  gender: data.gender,
                  date_of_birth : data.date_of_birth, 
                  profile_picture : data.profile_picture,
                  adress : data.adress,
                  biography: data.biography,
                  password: data.password,
                  email: data.email
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true,
                }
                
              );
            } catch (error) {
              console.log(this.error);
          }
        },
        async loginUser(context, data){
          try {
              const apiResponse = await axios.post(
                'http://localhost:9966/auth/login', 
                { email : data.email, password : data.password },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true,
                }
                
              );
              if (apiResponse.status === 200) {
                context.commit('LOGGED');
              }
              context.commit('USER', { data: apiResponse })
    
            } catch (error) {
              console.log(this.error);
          }
        },
        async postTrack(context, data){
          try {
              const apiResponse = await axios.post(
                'http://localhost:9966/api/interpretation', 
                { 
                  title : data.title, 
                  artist_name : data.artist_name,
                  track: data.track,
                  cover: data.cover,
                  duration: data.duration,
                  user: data.user
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true,
                } 
              );
              context.commit('TRACK', { data: apiResponse.data.data });
            } catch (error) {
              console.log(this.error);
            }
        },
        async fetchAllComments(context) {
          try {
            const apiResponse = await axios.get(
              'http://localhost:9966/api/comment',
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              }
            );
            context.commit('COMMENTS', { data: apiResponse.data.data });            
          } catch (error) {
            console.log(error)
          }

        },
        async createComment(context, data){
          try {
              const apiResponse = await axios.post(
                'http://localhost:9966/api/comment', 
                { 
                  content : data.content, 
                  subjectOf : data.subjectOf,
                  author: data.author
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true,
                } 
              );
              context.commit('UPDATE_INTERPRETATION_COMMENT', { data: apiResponse.data.data })
            } catch (error) {
              console.log(this.error);
            }
        },
        async deleteComment(context, id) {
          try {
            const apiResponse = await axios.delete(
              `http://localhost:9966/api/comment/${id}`,
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              } 
            )
            context.commit('DELETE_COMMENT', id);
          } catch (error) {
            console.log(error);
          }
        },
        async createLike(context, data){
          try {
              const apiResponse = await axios.post(
                'http://localhost:9966/api/like', 
                { 
                  potentialAction : 'Like', 
                  subjectOf : data.subjectOf,
                  author: data.author
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true,
                } 
              );

              // Update likes interpretation
              console.log('apiResponse',apiResponse.data.data);
              //context.commit('UPDATE_LIKES_INTERPRETATION', { data: apiResponse.data.data });

            } catch (error) {
              console.log(this.error);
            }
        },
        async deleteLike(context, id) {
          try {
            const apiResponse = await axios.delete(
              `http://localhost:9966/api/like/${id}`,
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              } 
            )

            console.log('delete', apiResponse)
          } catch (error) {
            console.log(error);
          }
        },
        async fetchOneInterpretation(context, id) {
          try {
            const apiResponse = await axios.get(
              `http://localhost:9966/api/interpretation/${id}`,
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              }
            );
            console.log('apiResponse',apiResponse.data.data[0]);
            context.commit('INTERPRETATION_TO_EDIT', { data: apiResponse.data.data[0] });
            
          } catch (error) {
            console.log(error)
          }

        },
        async fetchAllInterpretations(context) {
          try {
            const apiResponse = await axios.get(
              'http://localhost:9966/api/interpretation',
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              }
            );
            context.commit('INTERPRETATIONS', { data: apiResponse.data.data });            
          } catch (error) {
            console.log(error)
          }

        },
        async deleteTrack(context, id) {
          try {
            const apiResponse = await axios.delete(
              `http://localhost:9966/api/interpretation/${id}`,
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              } 
            )
            context.commit('DELETE_TRACK', id);
          } catch (error) {
            console.log(error);
          }
        },
        async editTrack(context, data) {  
          try {
            const apiResponse = await axios.put(
              `http://localhost:9966/api/interpretation/${data.id}`,
              { 
                title : data.payload.title, 
                artist_name : data.payload.artist_name,
                track: data.payload.track,
                cover: data.payload.cover,
                duration: data.payload.duration,
                user: data.payload.user
              },
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              } 
            )
            context.commit('UPDATE_TRACK', apiResponse.data.data);
          } catch (error) {
            console.log(error);
          }
        },
        async checkUser(context){
          try {
              const apiResponse = await axios.get(
                'http://localhost:9966/auth/me', 
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true,
                }
                
              );
              if (apiResponse.status === 200) {
                context.commit('LOGGED');
              }

              context.commit('USER', { data: apiResponse.data.data[0] });
              context.commit('MY_TRACKS', { data: apiResponse.data.data[1] });
            } catch (error) {
              console.log(this.error);
          }
        }
    },
});

export default store;