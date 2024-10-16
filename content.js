// 通常のYouTube動画のコメント欄を非表示にする
function hideVideoComments() {
  const comments = document.getElementById('comments');
  if (comments) {
      comments.style.display = 'none';
  }
}

// YouTube Shortsのコメント欄とボタンを非表示にする
function hideShortsComments() {
  // コメントボタンとラベルを削除する
  const shortsCommentElements = document.querySelectorAll('.yt-spec-button-shape-with-label');
  shortsCommentElements.forEach(element => {
      element.remove();  // 要素を完全に削除
  });

  // Shortsのコメント欄自体を取得して非表示にする
  const shortsComments = document.querySelector('ytd-reel-player-overlay-renderer #panel');
  if (shortsComments) {
      shortsComments.style.display = 'none';
  }
}

// ページ全体のコメント欄とボタンを非表示にする
function hideAllComments() {
  hideVideoComments();
  hideShortsComments();
}

// Shortsのオーバーレイ領域を監視してコメント非表示を適用する
function observeShortsComments() {
  const reelPlayerOverlay = document.querySelector('ytd-reel-player-overlay-renderer');
  if (reelPlayerOverlay) {
      const observer = new MutationObserver(hideShortsComments);
      observer.observe(reelPlayerOverlay, { childList: true, subtree: true });
  }
}

// ページ全体のコメントを非表示にするための監視とイベントリスナー
window.addEventListener('load', hideAllComments);

// 動的な変更を監視してコメント欄を非表示にする
const bodyObserver = new MutationObserver(hideAllComments);
bodyObserver.observe(document.body, { childList: true, subtree: true });

// スクロールして次のShortsが読み込まれるときのために、Shortsオーバーレイを監視
window.addEventListener('scroll', observeShortsComments);
window.addEventListener('yt-navigate-finish', hideAllComments);
