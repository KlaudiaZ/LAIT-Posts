import './css/index.css';
import './css/other.css';
import axios from 'axios';
import superagent from 'superagent';
import $ from 'jquery';
import { getPosts } from './getPosts';

console.log('JavaScript was attached to the page!');

document.addEventListener('DOMContentLoaded', (event) => {
    getPosts();
});