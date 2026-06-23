from bs4 import BeautifulSoup
import re

html = open('index.html', encoding='utf-8').read()
soup = BeautifulSoup(html, 'html.parser')

# Look for article blocks
print("Hero cards:", len(soup.select('.hero-content')))
print("Side cards:", len(soup.select('.side-card')))
print("News items:", len(soup.select('.news-item')))
print("Category sections:", len(soup.select('.category-section')))
print("News cards:", len(soup.select('.news-card')))
