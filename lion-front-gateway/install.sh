dnf -y install pcre-devel zlib-devel openssl openssl-devel

#安装不成功 改用 LuaJIT-2.1.0-beta3
#cd ./luajit2-2.1-20200102
#make && make install
#export LUAJIT_LIB=/usr/local/lib
#export LUAJIT_INC=/usr/local/include/luajit-2.1
#make clean

cd ./LuaJIT-2.1.0-beta3
make && make install
export LUAJIT_LIB=/usr/local/lib
export LUAJIT_INC=/usr/local/include/luajit-2.1
make clean

rm -rf /usr/local/nginx
cd ../nginx-1.18.0
./configure \
  --with-http_gzip_static_module \
  --with-http_ssl_module \
  --add-module=../ngx_devel_kit-0.3.1 \
  --add-module=../lua-nginx-module-0.10.14 \
  --with-ld-opt="-Wl,-rpath,/usr/local/lib"
make && make install
make clean

\cp -rf ../lua-resty-redis-0.28 /usr/local/nginx
\cp -rf ../lua-resty-http-0.15 /usr/local/nginx
\cp -ff ../conf/nginx.conf /usr/local/nginx/conf