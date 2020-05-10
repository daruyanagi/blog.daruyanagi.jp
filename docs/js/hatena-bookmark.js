function HatenaBookmarkCallback(data)
{
    console.log(data);

    if (data === null)
    {
        document.write(`
        <section class='card hatena-bookmark'>
            <header class="card-header hatena-bookmark-header">はてなブックマークのコメント：0 user</header>
            <p class='card-body'>この記事にはまだコメントがついていません。
            <a class='btn btn-primary float-right' href='https://b.hatena.ne.jp/my/add.confirm?url=${ encodeURI(document.URL) }'>コメントを残す</a>
            </p>
        </section>`);
        return;
    }

    let comments = "";
  
    for (const bookmark of data.bookmarks) {
        comments += `
            <li class='list-group-item hatena-bookmark-item'>
                <img class='hatena-bookmark-item-image' src='//cdn1.www.st-hatena.com/users/${ bookmark.user.substring(0, 2) }/${ bookmark.user }/profile_s.gif' />
                <span class='hatena-bookmark-item-user'><a href='https://b.hatena.ne.jp/${ bookmark.user }/'>${ bookmark.user }</a></span>
                <span class='hatena-bookmark-item-comment'>${ bookmark.comment }</span>
                <small class='hatena-bookmark-item-timestamp'><time>${ bookmark.timestamp }</time></small>
            </li>
        `;
    }

    const html = `
    <section class='card hatena-bookmark'>
        <header class="card-header hatena-bookmark-header">はてなブックマークのコメント：<a href='${ data.entry_url }'>${ data.count } user${ data.count === 0 ? '' : 's' }</a></header>
        <ui class='list-group list-group-flush hatena-bookmark-comments-list'>
        ${ comments }
        </ul>
        <footer class='card-body'>
            <a class='btn btn-primary float-right' href='https://b.hatena.ne.jp/my/add.confirm?url=${ data.url }'>コメントを残す</a>
        </footer>
    </section>`;

    document.write(html);            
}