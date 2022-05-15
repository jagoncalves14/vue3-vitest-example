<template>
  <header>
    <div class="logo">
      <img src="@/assets/logo.svg" />
    </div>
    <nav>
      <router-link to="/">Popular Movies</router-link>
      <div class="separator">|</div>
      <router-link to="/contact">Contact</router-link>
    </nav>
  </header>

  <div id="app__body">
    <router-view />
  </div>
</template>

<style lang="scss">
$header-height: 83px;

body {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  position: fixed;
  width: 100%;
  max-width: 100%;
  top: 0;
  height: 83px;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  border-bottom: 1px solid black;
  box-sizing: border-box;

  .logo {
    display: inline-flex;
    flex: 0 1 auto;
    align-items: center;
    margin-left: 0;
    margin-right: auto;
    font-size: 20px;
    line-height: 18px;
    font-weight: bold;
    text-transform: uppercase;

    img {
      max-height: 50px;
    }
  }

  nav {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    background-color: white;
    text-align: left;
  }

  nav a {
    display: inline-block;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: rgba(blue, 0.5);
    }
  }

  nav .separator {
    display: inline-block;
    margin: 0 30px;
  }
}

#app__body {
  padding-top: $header-height;
}
</style>
