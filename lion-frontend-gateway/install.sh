#dnf -y install pcre-devel zlib-devel openssl openssl-devel
#yum install -y yum-utils
#yum-config-manager --add-repo https://openresty.org/package/rhel/openresty.repo
#yum install -y openresty
#export LUAJIT_LIB=/usr/local/openresty/luajit/lib
#export LUAJIT_INC=/usr/local/openresty/luajit/include/luajit-2.1

#安装不成功 改用 LuaJIT-2.1.0-beta3
#cd ./luajit2-2.1-20200102
#make && make install
#export LUAJIT_LIB=/usr/local/lib
#export LUAJIT_INC=/usr/local/include/luajit-2.1
#make clean

#出现过安装不成功的情况改用openresty
#cd ./LuaJIT-2.1.0-beta3
#make && make install
#export LUAJIT_LIB=/usr/local/lib
#export LUAJIT_INC=/usr/local/include/luajit-2.1
#make clean

sudo apt -y install lua5.3 openssl libssl-dev libpcre3 libpcre3-dev


cd ./LuaJIT-2.0.5
make && make install
export LUAJIT_LIB=/usr/local/lib
export LUAJIT_INC=/usr/local/include/luajit-2.0
make clean

rm -rf /usr/local/nginx
cd ../nginx-1.20.2
./configure --without-http_gzip_module --with-http_gzip_static_module --with-http_ssl_module --add-module=../ngx_devel_kit-0.3.1 --add-module=../lua-nginx-module-0.10.14 --with-ld-opt="-Wl,-rpath,/usr/local/lib"
make && make install
make clean

\cp -rf ../lua-resty-redis-0.28 /usr/local/nginx
\cp -rf ../lua-resty-http-0.15 /usr/local/nginx
\cp -ff ../conf/nginx.conf /usr/local/nginx/conf