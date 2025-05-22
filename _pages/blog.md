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
  {% assign latest_post = site.posts.first %}
  
  {% if latest_post %}
    <article class="post-content">
      <header class="post-header">
        <h1 class="post-title">{{ latest_post.title }}</h1>
        <p class="post-meta">
          {{ latest_post.date | date: '%B %d, %Y' }}
          {% if latest_post.author %}by {{ latest_post.author }}{% endif %}
          {% if latest_post.external_source %}
            &nbsp; &middot; &nbsp; {{ latest_post.external_source }}
          {% endif %}
        </p>
      </header>
      
      <div class="markdown-content">
        {{ latest_post.content }}
      </div>
    </article>
  {% else %}
    <p>No blog posts found.</p>
  {% endif %}
</div>
