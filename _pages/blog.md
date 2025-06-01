---
layout: default
permalink: /blog/
title: blog
nav: true
nav_order: 1
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3 # The number of links after the current page
---

<div class="post">
  {% for post in paginator.posts %}
    <article class="post-content">
      <header class="post-header">
        <h1 class="post-title">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h1>
        <p class="post-meta">
          {{ post.date | date: '%B %d, %Y' }}
          {% if post.author %}by {{ post.author }}{% endif %}
        </p>
      </header>
      
      <div class="markdown-content">
        {{ post.excerpt }}
        <a href="{{ post.url | relative_url }}">Read more...</a>
      </div>
    </article>
  {% endfor %}
</div>
