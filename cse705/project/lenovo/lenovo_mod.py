########################################################################
#   Copyright 2014: (wbwang14@outlook.com)
#   Date of Creation: 2014-10-21
#   Last Update: 2014-10-31
#
#   This program is free software; you can redistribute it and/or modify
#   it under the terms of the GNU General Public License as published by
#   the Free Software Foundation; either version 2 of the License, or
#   (at your option) any later version.
#
#   This program is distributed in the hope that it will be useful, but
#   WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
#   General Public License for more details.
#
#   You should have received a copy of the GNU General Public License
#   along with this program; if not, write to the Free Software
#   Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
#   02110-1301 USA.

import logging
import urllib
import urllib2
import socket
import re
import time
import sched
import webbrowser
from config import getConfig

########################################################################
# Function: content = open_url(url_str, data, header, timeout)
# Description: open the given url (with the POST message defined in data)
#
def open_url(url_str, data, header, timeout):
  print url_str
  if header == '':
    req = urllib2.Request(url_str, data)
  else:  
    req = urllib2.Request(url_str, data, header)
  try:
    fh = urllib2.urlopen(url = req, timeout = 10)
    code = fh.getcode()
  except Exception, e:
    if isinstance(e, urllib2.HTTPError):
      str_log_line = 'error # 1, http error {0}' + e.format(e.code)
      print str_log_line
      log_write(str_log_line)
      return ''
    elif isinstance(e, urllib2.URLError) and isinstance(e.reason, socket.timeout):
      str_log_line = 'error # 2, url error: socket timeout {0}'+ e.format(e.__str__())
      print str_log_line
      log_write(str_log_line)
      return ''
    else:
      str_log_line = 'error # 3:' + e.__str__()
      print str_log_line
      log_write(str_log_line)
      return ''
  
  content = ''
  try:
    content = fh.read()

  except Exception, e:
    print 'error: ' + e.__str__();  
    return content

  return content


########################################################################
# Function: processURL(url)
# Description: looking for items and adding to carts
#       
def processURL(url):
  header = {'User-agent': 'Mozilla/5.0'}
  content = open_url(url, None, header, 10)
  
  tmp_found = re.findall(r"<a class=\"button-called-out button-full\"(.+?)Add to cart", content, re.S)
  if len(tmp_found) != 0:
    new_url = re.findall(r"href=\"(.+?)\">", tmp_found[0], re.S)
    itemid =  re.findall(r"\?sb=(.+?)\"", tmp_found[0], re.S)
    new_addtocart_url = new_url[0]
    print "URL adding the laptop to the cart:\n  " + new_addtocart_url + "\n"
    print "URL extraction done\n"
    # new_addtocart_url1 = '//outlet.lenovo.com/SEUILibrary/controller/e/outlet_us/LenovoPortal/en_US/cart.workflow:AddToCart?addtocart-item-id='+itemid[0]
    # webbrowser.open(new_addtocart_url)
  else:
    print ("The deal was found but lost before adding to shopping cart...")
  

########################################################################
# Function
# Description: dump a user message into a log file for analysis
# TODO: add some format
def log_write(str_log_line):
  logger.info(str_log_line)

########################################################################
# Entrance
#
if __name__ == "__main__":
  url = getConfig()
  processURL(url)
