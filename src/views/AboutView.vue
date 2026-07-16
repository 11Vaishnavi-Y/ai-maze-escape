<template>
  <div class="about-page">

    <div class="card">

      <h1>🧩 About AI Maze Escape</h1>

      <p class="intro">
        AI Maze Escape is a puzzle game where your goal is to guide the player
        from the start to the exit while avoiding walls. Challenge yourself to
        finish each maze in the shortest time with the fewest moves.
      </p>

      <div class="section">
        <h2>🎮 How to Play</h2>

        <ul>
          <li>😀 Start from the top-left corner.</li>
          <li>🚪 Reach the exit at the bottom-right corner.</li>
          <li>⌨️ Use the Arrow Keys on desktop.</li>
          <li>📱 Use the on-screen controls on mobile.</li>
          <li>🧱 You cannot move through walls.</li>
        </ul>
      </div>

      <div class="section">
        <h2>💡 Game Features</h2>

        <ul>
          <li>💡 Use Hint to highlight the next best move.</li>
          <li>🔄 Start a fresh maze anytime using New Game.</li>
          <li>🌗 Switch between Light and Dark themes.</li>
          <li>🎯 Choose Easy, Medium, or Hard difficulty.</li>
        </ul>
      </div>

      <div class="section">
        <h2>🏆 Scoring</h2>

        <ul>
          <li>⏱️ Complete the maze as quickly as possible.</li>
          <li>👣 Use fewer moves for a better score.</li>
          <li>🏅 Unlock achievements based on your performance.</li>
          <li>📋 Your best runs are saved in the Leaderboard.</li>
        </ul>
      </div>

      <div class="section">
        <h2>🎯 Challenge Yourself</h2>

        <p>
          Can you complete the Hard difficulty with the fastest time and the
          fewest moves? Try to earn every achievement and climb the leaderboard!
        </p>
      </div>

    </div>

  </div>
</template>

<style scoped>
.about-page{
display:flex;
justify-content:center;
padding:40px 20px;
}

.card{
max-width:900px;
width:100%;
background:white;
padding:35px;
border-radius:20px;
box-shadow:0 15px 35px rgba(0,0,0,.12);
}

h1{
margin-bottom:20px;
color:#1e293b;
}

.intro{
font-size:17px;
line-height:1.8;
color:#475569;
margin-bottom:30px;
}

.section{
margin-bottom:30px;
}

.section h2{
margin-bottom:12px;
color:#2563eb;
}

.section ul{
padding-left:22px;
line-height:2;
color:#475569;
}

.section p{
line-height:1.8;
color:#475569;
}

@media(max-width:768px){

.card{
padding:20px;
}

h1{
font-size:1.8rem;
}

.intro{
font-size:16px;
}

}
</style>