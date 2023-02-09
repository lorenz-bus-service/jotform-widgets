# Purpose: move HTML, JS, and JSON files to the public, HTML directory

TARGET=/var/www/html/jotform.domain.com

echo "changing permissions..."
sudo chown -R ${USER:=$(/usr/bin/id -run)}:$USER $TARGET

for file in *.html *.js; do


  if ls *.html 1> /dev/null 2>&1; then
    echo "Moving $file..."
    mv $file $TARGET

  elif ls *.js 1> /dev/null 2>&1; then
    echo "Moving $file..."
    mv $file $TARGET

  elif ls *.json 1> /dev/null 2>&1; then
    echo "Moving $file..."
    mv $file $TARGET

  fi

done

echo "restoring permissions..."
sudo chown -R root:root $TARGET