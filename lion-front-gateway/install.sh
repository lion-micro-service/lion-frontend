dnf -y install pcre-devel

cd ./luajit2-2.1-20200102
make && make install
export LUAJIT_LIB=/usr/local/lib
export LUAJIT_INC=/usr/local/include/luajit-2.1
make clean

rm -rf /usr/local/nginx
cd ../nginx-1.18.0
./configure \
  --add-module=../ngx_devel_kit-0.3.1 \
  --add-module=../lua-nginx-module-0.10.14 \
  --with-ld-opt="-Wl,-rpath,/usr/local/lib"
make && make install
make clean

cp -r ../lua-resty-redis-0.28 /usr/local/nginx
cp -r ../lua-resty-http-0.15 /usr/local/nginx
\cp -f ../conf/nginx.conf /usr/local/nginx/conf