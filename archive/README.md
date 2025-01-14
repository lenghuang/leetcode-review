Here are two versions of this project that I did.

In the first attempt, I followed a basic next app starter, and got some work MVP's with ChatGPT working and Leetcode API working. However, I quickly discovered that this may not be scalable because of my heavy reliance on LeetCode as well as making ChatGPT calls per user. Also, my frontend was a bit clunky, since I was effectively doing a MPA with NextJS and thought the framework might've been overkill for my use case, since mine is mostly for an app where a user is logged in.

In the second attempt, I opted for a simpler approach, and tried using an express backend to decouple the backend a bit more. Additionally, the front end was a simpler Vite App that required less overhead. I got pretty far in learning backend concepts with this, but still realized that I may need more of a dedicated backend to work with, in order to make batch requests for Open AI work.

In the third attempt, I'll try to use Edge Functions and more.
