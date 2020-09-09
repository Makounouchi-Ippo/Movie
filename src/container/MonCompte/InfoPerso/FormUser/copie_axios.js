.then(response => {
    const photo = response.additionalUserInfo.profile.profile_image_url
    axios.get(`https://movies-27cd5.firebaseio.com/${response.user.uid}/photo.json`)
    .then(response => {
        console.log(response.data)
        if (response.data === null) {
            axios.put(`https://movies-27cd5.firebaseio.com/${response.user.uid}/photo.json`, photo)
                .then(res => console.log(res))
        }
            localStorage.setItem('photo', photo)
       
    })
    .catch(error => {
        console.log(error)
    })
    localStorage.setItem('id', response.user.uid)
    localStorage.setItem('token', response.credential.accessToken)
    localStorage.setItem('name', response.user.displayName)
    localStorage.setItem('email', response.user.email)
    localStorage.setItem('show', true)
    localStorage.setItem('animation', true)
    //localStorage.setItem('toolbar', true)
    dispatch(authSuccess(response.credential.idToken, response.user.uid));
    history.push('/home');
})
.catch(err => {
    dispatch(authFail(err.message));
})