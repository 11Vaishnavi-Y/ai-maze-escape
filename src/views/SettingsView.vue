<template>
<Navbar/>
  <div class="settings-page">

    <div class="card">

      <h1>⚙️ Settings</h1>

      <div class="setting">

        <label>Difficulty</label>

        <select>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

      </div>

      <div class="setting">

        <label>Theme</label>

        <button>
          🌙 Dark / ☀️ Light
        </button>

      </div>

      <div class="setting">

        <label>Sound Effects</label>

        <input type="checkbox">

      </div>

      <div class="setting">

        <label>Show Hints</label>

        <input type="checkbox" checked>

      </div>

      <div class="setting">

        <label>Reset Leaderboard</label>

        <button
          class="danger"
          @click="resetLeaderboard"
        >
          Clear Scores
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import Navbar from '../components/common/Navbar.vue' 
import { clearLeaderboard } from '../utils/leaderboard'

function resetLeaderboard() {
  if (confirm("Clear all leaderboard scores?")) {
    clearLeaderboard()
    alert("Leaderboard cleared!")
  }
}

</script>

<style scoped>

.settings-page{
display:flex;
justify-content:center;
padding:40px 20px;
}

.card{
width:700px;
background:white;
padding:35px;
border-radius:20px;
box-shadow:0 15px 35px rgba(0,0,0,.12);
}

.setting{
display:flex;
justify-content:space-between;
align-items:center;
padding:18px 0;
border-bottom:1px solid #eee;
}

.setting:last-child{
border:none;
}

label{
font-weight:600;
font-size:17px;
}

select,
button{
padding:10px 18px;
border-radius:10px;
border:1px solid #ddd;
cursor:pointer;
}

button{
background:#2563eb;
color:white;
border:none;
}

button:hover{
background:#1d4ed8;
}

.danger{
background:#dc2626;
}

.danger:hover{
background:#b91c1c;
}

@media(max-width:768px){

.setting{
flex-direction:column;
align-items:flex-start;
gap:10px;
}

.card{
padding:20px;
}

button,
select{
width:100%;
}

}
</style>