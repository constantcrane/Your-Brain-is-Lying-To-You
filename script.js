const PAYMENT_URL = "https://rzp.io/rzp/7Q10uRsD";
const EBOOK_DOWNLOAD_URL = "https://drive.google.com/file/d/1AlVby6YHat_XhtSPqeqPCRJW3sTCNE9f/view?usp=sharing";

document.querySelectorAll('body *').forEach(el => {
  if (el.children.length === 0 && el.textContent.includes('AUTHOR/BRAND NAME')) {
    el.textContent = el.textContent.replaceAll('AUTHOR/BRAND NAME', 'Alexius Curry');
  }
});
document.querySelectorAll('script').forEach(el => {
  if (el.textContent.includes('AUTHOR/BRAND NAME')) {
    el.textContent = el.textContent.replaceAll('AUTHOR/BRAND NAME', 'Alexius Curry');
  }
});

document.querySelectorAll('[data-payment]').forEach(link => { link.href = PAYMENT_URL; });
const download = document.querySelector('#downloadButton'); if (download) download.href = EBOOK_DOWNLOAD_URL;

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const quiz = [
  { q:'A jacket says:<br><strong>WAS $300 — NOW $150</strong><br><small>Before seeing the original price, would $150 have felt expensive?</small>', a:'Probably yes', result:'That first number can become an anchor—quietly shaping the judgment that follows.' },
  { q:'You receive 10 positive comments and 1 negative comment.<br><small>Which one are you more likely to remember?</small>', a:'The negative one', result:'Negativity bias can give a single criticism more attention than a collection of praise.' },
  { q:'You remember an event in vivid detail.<br><small>Does confidence guarantee that every detail is accurate?</small>', a:'No', result:'Memory can feel like a recording while actually being a reconstruction.' }
];
let quizIndex = 0;
const qText = document.querySelector('#quizQuestion'), qResult = document.querySelector('#quizResult'), qCount = document.querySelector('#quizCount'), qBar = document.querySelector('#quizBar');
document.querySelectorAll('.quiz-option').forEach(btn => btn.addEventListener('click', () => {
  const current = quiz[quizIndex]; qResult.textContent = current.result; qResult.classList.add('show');
  document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
  setTimeout(() => { quizIndex++; if (quizIndex >= quiz.length) { qText.innerHTML = 'You’ve just met a few of the patterns inside the book.<br><small>Curiosity is a useful first check.</small>'; qCount.textContent = '03'; qBar.style.width = '100%'; document.querySelector('.quiz-actions').style.display='none'; return; } qText.innerHTML=current ? quiz[quizIndex].q : ''; qCount.textContent = String(quizIndex+1).padStart(2,'0'); qBar.style.width = `${((quizIndex+1)/3)*100}%`; qResult.textContent=''; qResult.classList.remove('show'); document.querySelectorAll('.quiz-option').forEach(b => { b.disabled=false; }); }, 1200);
}));
