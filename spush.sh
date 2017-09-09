#\!/bin/sh

BRANCH=`git branch | grep "\*" | sed "s/\* //"`

echo "you are on branch $BRANCH"

if [ "$BRANCH" == "master" ]
then
    git add -A && git commit && git push origin $BRANCH && ssh root@interpont.com 'cd /var/www/nikacrm; git checkout master; git pull origin master'
else
    git add -A && git commit && git push origin $BRANCH 
fi
