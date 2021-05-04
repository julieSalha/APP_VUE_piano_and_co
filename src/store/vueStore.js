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

const player = () => {
  Amplitude.init({
      bindings: {
          39: 'next',
          37: 'prev',
          32: 'play_pause'

  },
      songs: [
          {
              name: "Song Name 1",
              artist: "Artist Name",
              album: "Album Name",
              url: "/song/url.mp3",
              cover_art_url: "/cover/art/url.jpg"
          },
          {
              name: "Song Name 2",
              artist: "Artist Name",
              album: "Album Name",
              url: "/song/url.mp3",
              cover_art_url: "/cover/art/url.jpg"
          },
          {
              name: "Song Name 3",
              artist: "Artist Name",
              album: "Album Name",
              url: "/song/url.mp3",
              cover_art_url: "/cover/art/url.jpg"
          }
      ],
      volume: 35,
      volume_increment: 10,
      volume_decrement: 10,
      default_playlist_art: "/url/to/default.jpg",
      cover_art_url: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUSExMVFhUXGBcXFRUVFxUXFxcYFRcWFxcXFxUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAQUAwQMBEQACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAADBAECBQYABwj/xAA+EAABAwIEAwUGBAQEBwAAAAABAAIRAyEEEjFBBVFhEyJxgZEGobHB0fAUFTLhQlJy8QcWI2IkM1OCorLC/8QAGgEAAgMBAQAAAAAAAAAAAAAAAgMAAQQFBv/EAC8RAAICAQQBAwMDAwUBAAAAAAABAhEDBBIhMUETIlEUMmFxgbEFkaEjM0JSweH/2gAMAwEAAhEDEQA/AOIquWoUZ9dqFogo5KYRAKhA1N8I0wQ4xKKyuSrsUpuKoC6uUO4vaDL0NhUQXKrISOashdrTE35K0uCjwoOieeiraWScO4ag+CiRbtcHWey+AAZ2jucjyCw6zK09kf3O1/TNMtnqSXN8DPEeJiSBUa3zEpeHB5as06nUpe2M0v5M2jmYe0Di4DWCCPctcts1sao5sVPFL1U7Xnkf4piQaTDzJSdNBxyyRp1uVTwxkvJh8UqZgD0v5WW2EaTRyc8lNqX4MVxVMWiJVELU2kmBdQg87hjwJcPBSMoPhMdPTZYK5IRaFdCQ2RUWOPengAHlUyCzwgZYMhUWeKohEqEPKEIUIelQhMqECNbMAaq+yjpeG8IaWNL7WusuTUuL2xR19P8A0+M4KUjVp0sO06Dzj4LK555I6Cw6eD8WNjh9J47rWu+KU82WD5bDeDDJfajN4rT7vYsd2ZA7s/pd0zbLRhbb9Rq/5Rm1MVs9GEtvx8P8WcbiaLmOLXghw1BW9SUlaODODg9slTCcOruY8FpiTB5EciN1HFSVMvHOUJXE6HixBo03MNi4kdLXHrKRgv1ZJ90jfrHF4IOHVmPVJIC2HLfQjUYgaImUAQhG/wAMw7aTDWdc/wAP3zSMrcpemv3OppIQxY3qJ/sM0Mb2jSY3ghT0lF8DFq3mg7X4MTFUg0n7krVaqzkTjtbRbMhsovXCcAALVRZBpKqICcxVRARCBoIhUQhWQkBSiFhSJ2V7WVaJ7I8lKZLPBrhzUpktG9xLEVBRpODsuYGWjW1plZ8cI+pJV0dPUZ8noY2nVr+PJiNqmZJOvn6rSjmG57L4qKzQ95AlZtXFvE6XJu/p+WsqTfB2GKodqwh4F5yuGh5ea5OPJ6crj+53smNTi4s5THYTMxzHj/Up3adyzcdYXVhJWpR6f8nGzY24uEvuj1+V/wDDnG2dPJaTmGrjH/8ADsbu094f1ifolxTWRv5/8NWSSeCMfKf88ieHOyejEw1ajKJqydCIp94DqlNBrk1uNvyZKI0YBPUlIwc3N+f4OhrWobcK6iv8stwFsh09PmrzOki/6fBScr/AlxZ8vjl8SmLpGXO/9RlMygofr01oZVEMpIQ1EMKAVWHsAV8KoLlASqYbr8VKAKswROnwQtItJvoew3BHO2KXLJCPY6GnnI18L7Oc1nlrYro1w/p/yzRp8AbySHrZeDStDjXgI7gTeSBa2QT0eP4K/kLOSL62RPosfwFq8NZlyuaCT+mdtylLUS3Wn+ppenhKFSXXRjYr2fuYC3Q1ifZzMmg54EKfB3B4Am5Tnnhtszx0eTeonXtxbGMbREl0SCemplcZ45zk8ng9AnGElC+aF+OUwMlUC83HMGxHvTtLJu4CNUkqyfD/AMPs4epQaKhH8IOb/tiR6hdZO1Z56UUp14/8BtqF5qTuJ9CPkoS7tsHQfBRxYpo0mGQiIicLhwagJ0b3j5XS8zqPH6D9LC8ivpcv9jPxtUve5x1JVKO1UgcmRzk5PyaHA3kdodg0HzmyVmW7avybNDkcN8vwZlSS4k3k6p1GFyb5YXIVKJZq1mpoyijVQSGKbkDGx5HqWBLxokSzKI5adyGaHAJ1WeetrodDRR8mpheCtGyxZNXJ+TVDBCPSNCngmjZZ5ZWxqiH7EBL3thqIE1xMBpKun5Y30/kK2HiACDsCh5jyC40CDSi3EoHiWgDM4aaeKKDbdIKC5oKaYIupuFuIricFMADXU9EcctdlwSXIm7hsPDuSes9x2ilBb9xbjtGaWXwI8kOlntyWXqce/E0cHxIQ1p3PdJ6N0+I9F2l20ecyL2xf7f2EcPZ3kfgVaFlGqIo3OD0Q4y6zRr9FWbI4x47NOi06yze7pGsKlBrT3TexBOqyuOeTVs6SnpccXSYhiuH9sM1JgF7hv0TY5PSe3JIzZdOs8fUwxoYwOCIoOaWwSYka22I+9UGTIvVi0+hunwtaeUZKr/u/waHAvY19QguBhDl1qXEOWZ4aNLmZ1n+Q2/ylZvqsw708PwfPq7F2DHQJlIlDKSQUMbk+DV4fw0nVYc2pS4R0cOlrlnTYTBwuXPK2a9qRo06IWdzIWLENloHUsFOxkVYOlTLrnRE3XQcmo8IMKA5KrFORPZRdRstMWxGJE5WGSdeiuMOLYyMPMiz8OTSc10E7EqKS32ity3poWw9YRB1COSDlDyMVK4AQKLbAUG2KnEA/RM2sP0z1anmlXGVAtcHM8Y4FmaY5yI2XTw6tXUjm6nQ7l7TlcRhSw5Yv11K6Kaa4OJOEoOmilPBVNcpjmVVq+y/Sm1e1/wBjdqNy0aZbpoY56396RDnLJS/b9DoZfZpoOHXn9SlCm5+glaJSUezJCMp9G1wngVac1x0WDUarG1VWdDS4Z4pW3R1XDuCvLgXxHLrzlcx5PETflzRa4PoPCOHtY0Wut+nxKKt9nFzZXJ0aWULTQiz88twpebJ2TKoG3Fi3mrgOExsuZm1LZ0ceKMEbuHwoCwTyWNsZa1KbKDMIAugJVnpB0Mq7LprsE3DTc+Sm4PfXCCZgLcldAU2Dbigdj4kImi3jYeAhj8gWxTEZW7C+pTFyNhbM7FVzoDHijhFGiEfkTokDQ+Z57pshjXgI551PkhopIWDpd5plUgnwg9Z7i6AYHNBFJLkFKkS5rgNZU4bAbsU/Dio7vBvTmm+o4L2ti5Y4y5mk6E8bTNg3eQnYWu2BqN22ogsFw2pV7pECdFonmhjdrlnL2ZMkds1SO79nvZhoAsFilknmZbccSqKOmbwtrBcZepQPBSuXAr1m3wHpYQC4Ujh5sGWSzZw+i6UOjHLsNCME+QYHAgDRc3PmcmdyEdqofbTAWGUmxoQBAWeVEPPaDE6bhRBp0EcRF4Vcgq7FKhfGaYE26pi29DVt6M/t3kknmPcnbUP2xGRVcRcoKVi9qTJq4ojePiqUSRghKti+phNUBsYAH1A4WRpOLDXAnUBBTVTRY0yvAlKcCmgIrd4kbCfM6I9vFFP4IpPJ+quSSCTs89xMNzW369FEq5oGUbY1h3taJgT7wlSTboFxfRXIDfz8VdtEo0cDiQDDWExqeSCUX22ZZ415Z9H4E1nZNc3cXO89V0dLGKhaODqXLe0zSImxWmr4M90YmLBovEfodp0PJc3LF4Z2umbsdZY89oepYoLVjmpLgRKFBvxQ5plgbTgsq4kmdtEBiW2WSaaohUiLlQJcgQ0zOx0HJEMviixwrdTPhJQ730iLI+kVxD5t0VwRIoUfAbceqarbGq2+BB/EALD4JyxNjfT+RStjJvdNjjC4QE40bgwmeixfrR7KMr3kabhW4cUy1kTdoO+CJSlwNRRrttkTXkpg61TIPEyfKw+aOEd7EZMix8smi7MJm11U47XQeLJ6kbXQahTk80uUuBo3WoCzJ8YSoyf3ALlMOygwNg3PvQucm7F+6+DS4e5obl08UNWzPlUrs672RxQdTN/4tP22W/SSpNHK12OpI6HMFts59GXxtwdTcN9R4hZ88d8GjTp3tmmYWGxndHNYcEnZtzY+wn4vquhZj2mYFxGdNMs1qBhHnGFCIXY3Mcx02HzV9DG9qpB8oQtgJg3G6iQaA1gAjRcbZz3FsX79OgWzBjs1KSguQGDwj3gkAk2A802clFpFvIl2x38jcBfUa+MJbygLNERr4EiUccoyoyQjWoObp0WmOSMuzNkxSjzAdwbJa49PefsrNkdSo0xfCYEiEXZdpFag+A+vzVpguN/2DYP9LghydovH0NYYZZdy+KVP3cBv4AUqsvPj9/FFKNRKT8Dme6TRVHn40kZQjjED00nZ0fs/jjTOQiDYzpIt6lOw0mcvWR3e5HQ1OKwFvjGzlPgycRxMuKY8dIqMuROk+AfFcaC25KOzNXGwX4pdfYjmbmNhq89I6SIc5AGkCLcxjbdWg06VjOWFQuwLnXQ0MSKuRIhj8Qxl7LRjga8eOkK4Thfb1BJhoAzeGsBaI5NkaQGoairOy4dw9rXhrRYBBCLcuTnZcrcbZathQC719bfEKOHJUcjaRzXEqYYeh0PRCkdLC9yEcTTBvG8K4tj4vwKugNbG9yj5b5LQnVZJBTouk0LnG5JjbqYISU6YxA6cAkI5c0yRLYt0NA6SVWNXIHI6i2Bwrge9y/sjyRa4KxS3x3DdOpZIaGNAsMC50pkuFQEnSNntDLXcvgluVSTMkYJwcR6tiIC7GFqSOFli4sT/ABQnVPlHgVF8hDXtK46heZnZb/0kL9qumc013VF5uR04ooHIBtBqCgMgjyqBQOm1QJsBizDT4FFHsOHLRzeLs4z094W2HRvj0dP7LcPLgHg2NiooOTOdrMyXtZ2NDDhsndbIwSOPKbfBmcQxVBshzxuIGonWI8Eie004oZX0jA4lhxUbDXAgaSCD77JO5G/DNwdswg3ulptOnRzdviq82b2+bRk5zotNBJlmPsJ2QtclLkvTqWQtcllXmHSiStUU+Ca7ZbKqLp0SVNA8OAG9SiyNuQGFKMF+Qv6fmg7HB8EBPVBNsCfRqnQdP7JU3bMsfIPG1Yb7l19C7gcfXLbMwamKIcurtTRzU6ZpVsQRTBOuq5eKKeolR18rawKzO/FFdHYjlbmdk4LyTPQICXIGhg0zZAAy5NlCIKzRUC+xXEN25okMgznsbTMx4D0stmN8G2DVWdd7LvqtDWFoawCL6p0LUuDk6tQlcvJ1FcgtI5rVKmuTmx4Z839qMcMPUApUw55kybxcbfeqrDgU27dJG/JnlGCdXYKh7QY1lJtarSmi/RwEjlcbI56WPUZC4ZU37o1+gXKKzc1Ma/qb82rnSi4umdWGSqt/uYuIw5a7l0TVK0aotMG+nB8bq1K0XRNNtnDrI87Km+gUgVU29wRxXJWR0hmhUaBkduIS5Rbe5FypJJlRRgjp9hRzuy0j1QzcaaIVwEiM0XG2qur4IzVoVZpgrPJe4Q17i1elmaunoZ7eDka+FsyPweZ8ffVdSWXbCzmY8e6dFMdVLmdM1vDZKwY9mTn4/wAmrUZd+Lj5EFuOcdq6vNl45o9OkFpMSpMtsb2CWLPObIUstMO0WVoDyL11aGRMniTSGBzdRdaMNbqY1N8lfYfB4io/tX1HBgEmZOaTAA9D6dV1Myx9RRzd81H3+T6C2pKQp2ZnGjC4v7Pds7MSBNj4dVI70zVjzxjHa0N/krywU3VCWCIbYC3gLq5Rm/ICzwi7UeS2C4FTpkmNUtwf/IuWplJcGL7T4FjmF27d0lS2y4NmkyO6OTaJE8pRvhnU8gaZkwjfySy5oyZ2CrdSoppWjKxtWXa6aLdhhUTk6vK3kq+h+g8lmU/qi30WPIkp2ujoYt2xX2RhX3hTIuLDi/DKOdsrS8hN+DaofoA6D3lZJfcLfZqMpd2EWPLtZgyrcZ+LoQDl1P2V08Wbe1fSMM8exOu2YddvdjqujF+6zFL7KF8qdYmjsqVDmvISkej3DlNsJTKCAISFwFRVhKLpCtFSQLEAKwomTiXz/ptu4+gHVOgq5Zoiv+TOrpOpYbDsFmiBmJ3JEk+JW5v2o5TUsuRsJw/GMcMzHh7TuDMeKCKcHyDkg+mjXhbKMtklUQyOIY9xOVgFtTsPqseXK26RsxYV3I5jjDBHfeXOOjRYeMbpEbs6WB/9VSMjFUxlyhEnzZri+bYrQp3v5I5MJstjKkd0eB+aqCvllL5OdrPAeRtJHyXWhFuFnDyTjHLT6sbbWyu9FkcN0TqeqozcX+BttOHFw2APqkuVxSH1zYLL3oPNFfFlm5R1AH3CxMVLo02FLszNEVGynQytCpQszsbw3Mujg1VGTLgTM38octn1cTL9MzqQV5xnWRZpQMIMxUCy8qii9JsBWSTM3EVy92UWaN+fgjVJWaIRUVb7L0aQaW21I+N5VxdsGUnJM6s0sx8NLArpJWcrdtKU+EsaSWgNky7KIzHqieOyPO6NKmbJyZnYrxKuWU3u3DSfclZJUhuGG6aRy9PD1XtHfgRtvKxHUc4Rk+BTFYBrIklzjuVTkxsMrkZxu7oFRo6QiH94n0TK4GeBGu7vE9PgnRVpIqTpWYuJF5OkyunjfFHn9QvdufRqOoyA7mufvpuJ3NkZ1M0WABvjb0WZ9ht8hmU2kXGmhQW0A20yO0c24v8AurpPsJ0+xlmPdElpjdL9NXVi3jXyO4fEh4kaJbi4umJlGhukQUSlQqSC9iEfqsCgRCUxiLtQMsM0oQSWXKsj6DBUAIGhlda45ckTdmhS3LksRMnpAVxBuuB/G8WcyA3UtBteSekdFujJ0Z8eCM+X8iuF9oq7f10XEdI+GqapV5DnpMb+1m3w/i4qiQ14/qEDwndHuZjyYNnbQbEPkEFLk7BiqdmZRZklm23gsz4dGqT3e4zeM080X0BKho08qMKo8NaeqtK2be2JNdoPemPoPyKcQ7ubw+KbhW5oVmntxtmO5mdo6G66G7ZI42x5oL8M28G4ZY2bf0XMyp7r+TtQpRSRam/ujpKprkuQahU2VShxYlSt0PUKoSnjYEpchqxBaQlqLTJF8gcCYc5u1nDz1VzVpMZPqzSolKEMbzKCwTSrkXFkEpbDCsKEFhKO6skhgFWLFcU9XQ2AHNaPD4okE+zVw+CbVAeDDhaVswx3RMk8rxtprgbo8HAOZ5LjuSfotKx+WJlqXVR4Q8RAgCyt8Cu3bFHpDGoWxDwlSGwTMLi2KGg1QpG3DAwqt0a4NSZV9PQqrLTFuNtz02uG1iOqfpZbZ0zNqYOWNoyKAgFbMj3NGbBFY4sfwjYa7yCyZXckbsUNqC0xBQvqwrt0Xc7KC7xhFD3NRE5fanNfBljHOG66n08WujgPVTT7HcNxMkwd7LJm0qSbRt0+quST8sfZiIcT0C56hdI6mTiIWnxdvNNekl8GL1oPyG/OW81X0svgr1Y/Jr1FgYyJLGygYbDtCoGy9MKFMs9yKKAEqrk5Rt0NXCKVCilCioSsb9nsdFXsybESPEftKbg4YOqxXDcjp34xoWxzRzVjYliOItG6TKY+GFszcRxUJbdmiOBmVisc52iqjTDGkKCkTcqmN3A30r6WiwQ2Emed+m/kh8k8mXTGZr2HxHknvhqSDaszaTJzBapyqmZ8cd25DeHb3T5/JIm/caIKkUcTqEyNNbWIypxluQcmbJP2sZxJGHiBBPiu3jk5JHmM8VGTLYI94dLoNS6gxuhW7MjXrnuz0XLxL30dzUP2N/g55zl20jzDbPZyrpFbn8n1LLOq8hI9CmXaEBYRUQuwKFNga70+CpWUuxGu5asUPbfyVkl7q/AF9WQjzJImmTbEH1CwhwMOmQeSTE6KqSp9Grh+Lue0F2u8fRSTZllhjF8BsHWFVxbEHZRWyprYrGqvCTEgpigxS1CC4Pgt5d5BE4AT1HhFcZSaDySZIZjk2hGvrYW2Q0OiJGlshbGJiVZuS/gmR93A1y4Miu3I8xz9xWqL3QBrbKw9Aw3x/ulT5Y1IoInoEa5QnK6fJXD1LuJ5osseIisLbcmZeNjMYO66OG1FWcPVNOboHhzfyKLLzEmk4m3+GaVZx7KQDosONL1mmdPNJ/Tpr4MJz11UefbJzKyj6xm6ryLPRIu1AwixQkCEwEUUCZ+IqLTt6QUPkzqta5HRdBxqKMsZbpsq50CPVZn75m2C9OAGqJQPs0Y3SQNpj5okVkjY/wADrRXZ/VHrZHtozZHcWd66jayfRzFIqShZaMupRBddZZLk1xlSE8XT06FLsdBmaDcoWh4nxDClzZHkixT2sN8qjExdMkjrE+VvotUJJJjGrJcy09fkEKfIygDymRdC8sdyKSdtUfDasR9sGZWNDmm9p5roYpJo8/qIuMg/BmS8WmLxrZK1UqgN0cfedezDSTa37LjKfJ1Z/bRk4vgdyWt+yvR6bc4Js4WdRUnQv+AH8vwWjYxO5HbNC8dI9AHaEtkLtufAfFUW+ildydjQDM2ruVrgvekSUv8ATZm02HNK3ZmtlGXT/fZd7LeaxYnydLN0VcSqS45Cb9ySAMcSAhqmaJIPSdkc13Ig+hR7uDP6e7g+m4Z+ZoK0Y3aOLkVOi9WiraskZGXUZcrNNcmmL4EeIN7h6lJkh+L7jIqtDdUDNUeSa1J2QmzQL3u4/IIUiKS3fJg1afd53Tk+TWuCDQMS4EC8KXzwTcr4FBhr6pm8jY1R4bUnM1uYdbfFC8qqmJlKFUXx3CXVG5ct7R/dFhz7JWYc2JTVDPC+DOoiSBJ5e/5Ic+o9RlY8aiqQy1+UkGw+RS8cbkhmX7LOhwWEDxPRelh7Ukedm7YP8lby+/VO9Ri6EmrxzPShmpTIEZurRTEcZXhbMMORUnwKVqndT8f+42Sf+2kJsqiQOqdO6bAx9oK75/RZI8M2z5oWxTv4RvqVImhKvcwJbAhMS5FOdpsigxznQASrnwiYpVyfT+EE9kydcoB8gmYXcTkaj73Q8QnCRatSCXKKGRkzJ4pTsFlyR6NWCXZiVR355GI8EmrdG5P2l+KteWCbAkADc+KtqisLju4FGcOeQJsNud0G4Y8sUaDODMAuJO8qm5CHqGDp8NGaQ0RtKpNsuWXjljv4Mm0yptYn1EgrcCWotjB9WwwwMi6v0mwPVSEcbw0RcSEHug7Q1ZFLhjvCqzQ3s9Dt1/ddnS6xZFtl3/JzdRpnF7o9Fs3VdDcY9piUgvKSZ6Edo0SUumwZSoPUwxG2ydHG0K3pnP8AEaRLoXQxKkLk7EOIzOUaCEemjxuZeeXKiDoUCSOXVTLOMU7GYYSbsaxA0jlCxRuTN69qKdlYI1UZAtuaD4Thbqmth8kXqVyhU6So2sHgAIa0am/klJuTtgOdI6jDUsoAW3Gmkc2ctzGSmixd4KFhqhPiFKW+F/RIzL2jsUqkYWFYO0vzJnoZv6rJfJvm/YG4swy06wc3psqkDga5QfDDOJF5VRjYE/bwxv8ADndG4N9id/wWFDlZWoAuY5h8MB4rTjxpITObYX8OEz00DvI7NVtolimLpLNliNxyMXEYe6ycpmyMrF+zf/MU76nL/wBmV6eP/qiMIySktWy26Ou4dgA1oJF11dPplGNs5ubM26QzVwwOy0SxJilkaOZ4rw+DICy5FtVGrFK3ZgVcLJ0RXtVIYuXbDUOEvcQdG7zv5LLk5ZrhmjCNeS2J4WZgbbpSm0wlkTjyWo4ItEATuhnNydlppI1MJh3xcRKJJ/Aic4+GauCw4b4rRjil2Zck2zQYtcTOy6IEERdCGUcBBlU6otXZitwM5m7gyOgNxCwem3aNvq9MrXwVQgHM0xzF/BU8Umgo5YJ9F+HuDbAROo5HdDB0ysq3dmoGytSjZkbJaxWolNhmCE6KoBhSjBBPCBhIA9kpTjYadAvywu1sPelrSuXfAfrpdBPylnM+oTPo4fIP1MjmcBUAcFz0qZtmrR2mFqBzQQu3impRtHJnFphimMAzMezMsmXlmnHwK4bhrdTdAoWG50MV6UCyDJClwSMrZSnh8rY3J+KpY9sfywpT3SBuw8GUEsdBKdoayaeKfVtCrGmsCdtQuySxXtKbPZVKJYKuLIJhRIjRTsgLEMghw2s4cx+31QzjT3IODtUWbT3+/FRR8lOXgXxOH7wcPHx6JOWCtNDYT4phm/ZVpfIDLtTEAwjSjKLtBKNJsFtFhR5otnyVvLBsbK0kirbKlypl0Vuq5LPhuG9p8pVz0Ka4NC1sfKO99nvaZrwIKwyWTA6GOMcitHSt4lmRfUtivRoba3uydStCXsv5Et+6gjGokimySxXtKsq5twha5LT4AV2+8pWRDIMPCZQFhGpgJcBWUySoQG4IWi0wJMFB0H2XIRAg6Yi22yBKnQbd8nqlPdDOHkikEFHoj2WDuJbhuZRLF8lOYVjGhGoxQFtl5R2UVdZUWjwVEBVG7oGGisHmUPJfB+WnOXRRkZo8N4i+mQQSqnjjkVMPHlljfB9E9mfaHPDTquPqdK8btdHSx5lkR9JoFxa2RFk2G7arM8qt0NBPQomFCFSFTREDcLj1QNXJBp8MJCIEsAiKLAK6KbPZCr2slk9mr2FbiDSCrYibmQ2mArUETcywaOSlL4JbLAqEIO6ohBUIVO6plo9MhTtE6ZDnS1U3wWlyUa+WgnkpfFl1ToX4jj2UWZ3m5/S3cnognJRVsPHBzdI5/wDzVU/6Y9SketI1/SR+T8/1V1jkk0nI0wWjvf8AC7AdrjGk/ppg1HDnEBo9SPRBm+0PE2rPt8LPSDssGjkptRLZOUKUiWQaYU2ollRSE7odisvcy4phXsRNzLBqKkVZKso8VCEKEIVMhVREJhUWehQhHNCWVlVZZRrroVLkJoq12oVJ+CNCtWrAeN4n79yS59obGPTKVuIspUO2doGiBzPLxlNU1tTK9NyntRxNXGvxNTO4/Ro5BZZyfbOjGCxqkMZEiwz4jUXoDz5DVaKPof8AhHiSMa1v87HtPkA7/wCVMv2F4+2fbQswwsiKJBVEJlQhAUITKhCZUISCiIelUQiVEQgqiEKyHlRCCUIQKdUARRxQtloAHXSbpjK4PPPeUk6kRLgVxZkyOoPgf3hJyO3Y2CpHHe2VUmjRpg6AuIHMQBPqUeOapIfCHubMzg1SGzzQZezTXBq9uk0Sj4vVF16A88UCso6z/D/jTcLimVHiWwWujUB0CR1H1VzW6JIOpH6Do1AQCDIWSLT6HSTXZdECSoiEqyENVELKEPKiyURRZWUVhUWeIUIVUIeKBloqAqCKlqFouwVRqGSLTE3LJJ0ORNV2hUm+Uy4rtCbXw8tO8pUX76Y1r22cd7UnvjwPxVY/Jqx9GLw+tlcW7G4WiStWMNntAk0yj5DiNV3TzwIKyD3DP+Y0dR8QrvhlJe5fqfo3B1SAPBcjHJo6E4pmlRxINjYrVHImZ5Y2uRgBMQDPQrKPBUQ8oQ8AqIWUIWAREI3VeSySFbKKkKEKwlhFw1WUeIUICqNshl0EjOrtiyw5FXBpixJ9a3nKzuXA1REMZVh7T/uA9UN+4bFe0572sF2nq4fBMxfcxuN8HLl153C1oOxv8X1VbC7PnuJbddU86BChDT4G2a1Mf72f+wVy+x/oy8f3x/U/QLDC40TolHVTKNMujb4dWLm32stWN2jHljT4G5TLFkSqIRKshIQoskKyBAESKKu1CHyWuiysorChCoCFBF1CiCrIQ5tkL6LQjj290rLm+0dj7MOoFz2bEZnEjAJ5Fp/8gqXY6CEPaZk0yeRB95CbjdTKgceBf0WyxhlZhy95W7k51n//2Q==",
      debug: true,
      callbacks: {
          stop: function(){
              console.log("Audio has been stopped.")
          }
      },
      delay: 3000,
      shuffle_on: true
  });
}

//export default player;
export default store;