<template>
  <header>
    <div class="logo">
      <img src="@/assets/newlogo.svg" />
    </div>
    <nav>
      <router-link to="/">Popular Movies</router-link>
      <div class="separator">|</div>
      <router-link to="/about">About</router-link>
    </nav>
  </header>

  <div id="app__body">
    <router-view />
  </div>
</template>

<style lang="scss">
  $header-height: 83px;

  body {
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    text-align: center;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 100%;
    height: 83px;
    padding: 0 30px;
    border-bottom: 1px solid black;

    .logo {
      display: inline-flex;
      flex: 0 1 auto;
      align-items: center;
      margin-right: auto;
      margin-left: 0;
      font-size: 20px;
      font-weight: bold;
      line-height: 18px;
      text-transform: uppercase;

      img {
        max-height: 50px;
      }
    }

    nav {
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
      text-align: left;
      background-color: white;
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
