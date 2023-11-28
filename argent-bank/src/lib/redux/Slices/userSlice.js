import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials) => {
        try{
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
        
            const data = await response.json();

            if (!data.body.token) {
                if (response.status === 401) {
                    console.error('incorrect username or password');
                    throw new Error('incorrect username or password');
                  } else {
                    console.error('Token not found in response');
                    throw new Error('Token not found in response');
                  }
            }

            return data.body.token;
        }
        catch(error)
        {
            console.error('Failed to connect user :', error.message);
            return null;
        }
    }
);

export const getUserProfile = createAsyncThunk(
    "user/profile",
    async (token) => {
        try
        {
            if(!token){
                throw new Error("Missing token !!");
            }
            
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();

            return data.body;
        }
        catch(error)
        {
            console.error('Failed to retrieve user profile :', error.message);
            return null;            
        }
    }
)

export const updateUsername = createAsyncThunk(
    'user/updateUsername',
    async (profileData) => {
      try {
        console.log(JSON.stringify({userName:profileData.userName}));
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${profileData.token}`
          },
          body: JSON.stringify({userName:profileData.userName}),
        });
  
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to update user details');
        }
        console.log(response);
  
        return profileData.userName;
      } 
      catch (error) {
        console.error('Error updating user details:', error.message);
        return null;
      }
    }
  );

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false, // authentification in progress
        token: null,
        error: null,
        profile: {
            firstName: '',
            lastName: '',
            userName: '',
        },
    },
    reducers: {
        disconnect: (state) => {
            state.token = null;
            state.user  = null;
            console.log("disconnect");
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading   = true;
            state.token     = null;
            state.error     = null;
            console.log("login user - pending");
            console.log(state);
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading   = false;
            state.token     = action.payload;
            state.error     = null;
            console.log("login user - fulfilled");
            console.log(state);
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading   = false;
            state.token     = null;
            state.error     = action.error.message;
            console.log("login user - rejected");
            console.log(state);
        })

        builder
        .addCase(getUserProfile.pending, (state) => {
            state.profile.firstName = null;
            state.profile.lastName = null;
            state.profile.userName = null;
            console.log("getUserProfile - pending");
            console.log(state);
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
            console.log(state);

            state.profile = action.payload;
            console.log("getUserProfile - fulfilled");
            console.log(state.token);
            console.log("-------------");
        })
        .addCase(getUserProfile.rejected, (state, action) => {
            state.error = action.error.message;
            state.profile.firstName = null;
            state.profile.lastName = null;
            state.profile.userName = null;
            console.log("getUserProfile - rejected");
            console.log(state);
        })

        builder
        .addCase(updateUsername.pending, (state) => {
            // nothing to do
            console.log("updateUsername - pending");
            console.log(state);
        })
        .addCase(updateUsername.fulfilled, (state, action) => {
            state.profile.userName = action.payload;
            console.log("updateUsername - fulfilled");
            console.log(action.payload);
        })
        .addCase(updateUsername.rejected, (state, action) => {
            state.error = action.error.message;
            console.log("updateUsername - rejected");
            console.log(state);
        })
    }
});

export const { disconnect } = userSlice.actions;
export default userSlice.reducer;