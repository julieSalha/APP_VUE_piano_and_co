import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Amplitude from 'amplitudejs'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: undefined,
        statusLogged: false,
        myTracks : [],
        interpretationToEdit: {},
        myStreamings : [],
        streamings : [],
        streamingToEdit: {},
        comments: [],
        uploadedFiles: [],
        lastStreamings: []
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
        UPDATE_TRACK(state, data){
          const index = state.myTracks.findIndex(track => track.id === data.id)
          state.myTracks[index] = data.payload;
        },
        MY_STREAMINGS( state, payload ){ 
          state.myStreamings = payload;
        },
        STREAMING( state, payload ){ state.myStreamings.push(payload.data) },
        STREAMINGS( state, payload ){ state.streamings = payload },
        DELETE_STREAMING(state, id){
          const index = state.myStreamings.data.findIndex(track => track.id === id)
          state.myStreamings.data.splice(index, 1)
        }, 
        UPDATE_STREAMING(state, data){
          const index = state.myStreamings.findIndex(track => track.id === data.id)
          state.myStreamings[index] = data.payload;
        },
        INTERPRETATION_TO_EDIT(state, payload){ state.interpretationToEdit = payload },
        // UPDATE_INTERPRETATION_COMMENT(state, data){
        //   let idInterpretation;
        //   for (const item of state.interpretations) {
        //     if (item[0]._id === data.subjectOf) {
        //       idInterpretation = item[0]._id;
        //     }
        //   }
        //   const index = state.interpretations.findIndex(interpretation => interpretation.id === idInterpretation)
        //   state.interpretations[index][1].push(data);
        // },   
        // COMMENTS(state, payload) { state.comments = payload.data },
        // DELETE_COMMENT(state, id) {
        //   /*let itemDelete;
        //   for (const item of state.comments) {
        //     if (item._id === id) {
        //       itemDelete = item;
        //     }
        //   }*/

        //   //const index = indexOf(itemDelete);
        //   //state.comments.splice(index, 1)

        //   //let deleteCo = state.comments.find(comment => comment._id === id);
        //   //deleteCo = {};
        // },
        UPLOADS(state, payload) { state.uploadedFiles = [].concat(payload.data) },
        LAST_STREAMINGS(state, payload){ state.lastStreamings = payload }
    },

    actions: {
        async registerUser(context, data){
          try {
              const apiResponse = await axios.post(
                'https://api-piano-and-co.herokuapp.com/auth/register', 
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
                'https://api-piano-and-co.herokuapp.com/auth/login', 
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
        async logoutUser(context, data){
          try {
              const apiResponse = await axios.get(
                'https://api-piano-and-co.herokuapp.com/auth/logout', 
                {
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true,
                }
                
              );
              console.log('logout', apiResponse);
              //location.href="https://julie.dwsapp.io/"
              location.href = "http://localhost:8080/"
    
            } catch (error) {
              console.log(this.error);
          }
        },
        async postStream(context, formData){
          try {
              const apiResponse = await axios.post(
                'https://api-piano-and-co.herokuapp.com/upload/', formData, 
                {
                  headers: {
                    'Content-Type': 'multipart/form-data;  boundary=--------------------------898552055688392969814829'
                  },
                  withCredentials: true,
                } 
              );
              console.log('apiResponse post', apiResponse.data.data)
              context.commit('STREAMING', { data: apiResponse.data.data })
            } catch (error) {
              console.log(this.error);
            }
        },
        async fetchOneStreaming(context, id) {
          try {
            const apiResponse = await axios.get(
              `https://api-piano-and-co.herokuapp.com/upload/${id}`,
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              }
            );
            //console.log('apiResponse',apiResponse.data.data[0]);
            context.commit('INTERPRETATION_TO_EDIT', { data: apiResponse.data.data[0] });
            
          } catch (error) {
            console.log(error)
          }
        },
        async fetchAllStreamings(context) {
          try {
            const apiResponse = await axios.get(
              'https://api-piano-and-co.herokuapp.com/upload',
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              }
            );
            context.commit('STREAMINGS', { data: apiResponse.data.data });
          } catch (error) {
            console.log(error)
          }
        },
        async fetchLastStreamings(context) {
          try {
            const apiResponse = await axios.get(
              'https://api-piano-and-co.herokuapp.com/upload/last',
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              }
            );
            const lastStreamings = apiResponse.data.data;
            const songsPiano = [];
            lastStreamings.forEach(streaming => {
              songsPiano.push({
                name: streaming[0].title,
                artist: streaming[0].artist_name,
                url: streaming[0].track,
                cover_art_url: streaming[0].cover
              })
            });
            context.commit('LAST_STREAMINGS', { data: songsPiano });
          } catch (error) {
            console.log(error)
          }
        },
        async deleteStreaming(context, id) {
          try {
            const apiResponse = await axios.delete(
              `https://api-piano-and-co.herokuapp.com/upload/${id}`,
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              } 
            )
            context.commit('DELETE_STREAMING', id);
          } catch (error) {
            console.log(error);
          }
        },
        async editStream(context, data){
          try {
              const apiResponse = await axios.post(
                `https://api-piano-and-co.herokuapp.com/upload/${data.id}`, data.payload, 
                {
                  headers: {
                    'Content-Type': 'multipart/form-data;  boundary=--------------------------898552055688392969814829'
                  },
                  withCredentials: true,
                } 
              );
              console.log('apiResponse update', apiResponse.data.data)
              //context.commit('STREAMING', { data: apiResponse.data.data })
            } catch (error) {
              console.log(this.error);
            }
        },
        // async editStreaming(context, data) {  
        //   try {
        //     const apiResponse = await axios.put(
        //       `https://api-piano-and-co.herokuapp.com/upload/${data.id}`,
        //       { 
        //         title : data.payload.title, 
        //         artist_name : data.payload.artist_name,
        //         track: data.payload.track,
        //         cover: data.payload.cover,
        //         duration: data.payload.duration,
        //         user: data.payload.user
        //       },
        //       {
        //         headers: {
        //           'Content-Type': 'application/json'
        //         },
        //         withCredentials: true,
        //       } 
        //     )
        //     console.log('editTrack', apiResponse);
        //     context.commit('UPDATE_TRACK', apiResponse.data.data);
        //   } catch (error) {
        //     console.log(error);
        //   }
        // },
        async fetchAllComments(context) {
          try {
            const apiResponse = await axios.get(
              'https://api-piano-and-co.herokuapp.com/api/comment',
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
                'https://api-piano-and-co.herokuapp.com/api/comment', 
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
              `https://api-piano-and-co.herokuapp.com/api/comment/${id}`,
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
                'https://api-piano-and-co.herokuapp.com/api/like', 
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
              //console.log('apiResponse',apiResponse.data.data);
              //context.commit('UPDATE_LIKES_INTERPRETATION', { data: apiResponse.data.data });

            } catch (error) {
              console.log(this.error);
            }
        },
        async deleteLike(context, id) {
          try {
            const apiResponse = await axios.delete(
              `https://api-piano-and-co.herokuapp.com/api/like/${id}`,
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true,
              } 
            )
          } catch (error) {
            console.log(error);
          }
        },
        async checkUser(context){
          try {
              const apiResponse = await axios.get(
                'https://api-piano-and-co.herokuapp.com/auth/me', 
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
              const myStreamings = apiResponse.data.data[1];
              const songsAccount = [];
              myStreamings.forEach(streaming => {
                songsAccount.push({
                  name: streaming.title,
                  artist: streaming.artist_name,
                  url: streaming.track
                })
              });
              context.commit('MY_STREAMINGS', { data: songsAccount });
            } catch (error) {
              console.log(this.error);
          }
        }
    },
});

export default store;