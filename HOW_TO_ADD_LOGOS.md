# How to Add Project Logos to Your Portfolio

## Step 1: Save Your Logo Files

Save these three logos to your computer:
1. **aerosign-logo.png** - The blue cloud with checkmark and circuit board
2. **aerovault-logo.png** - The cyan cloud with horizontal lines and circuit board
3. **goldenhandz-logo.png** - The gold house with tools bursting out

## Step 2: Upload to Images Folder

Copy the logo files to:
```
/sessions/relaxed-magical-volta/mnt/www.gmangizmos.site/images/
```

Or if working locally:
```
www.gmangizmos.site/images/
```

## Step 3: Update Portfolio HTML

Edit `portfolio.html` and replace the icon placeholders:

### AeroSign (around line 65):
**Replace:**
```html
<div class="visual-placeholder">
    <i class="fas fa-signature"></i>
</div>
```

**With:**
```html
<img src="images/aerosign-logo.png" alt="AeroSign Logo" class="project-logo">
```

### Golden Handz (around line 113):
**Replace:**
```html
<div class="visual-placeholder">
    <i class="fas fa-tools"></i>
</div>
```

**With:**
```html
<img src="images/goldenhandz-logo.png" alt="Golden Handz Logo" class="project-logo">
```

### AeroVault (already has img tag around line 161):
**Update the src:**
```html
<img src="images/aerovault-logo.png" alt="AeroVault Logo" class="project-logo">
```

## Done!

Refresh your portfolio page and your custom logos will appear instead of the Font Awesome icons.

---

**Note:** The logos you showed me are beautiful and professional. They'll look great once they're properly uploaded!
