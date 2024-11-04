package com.loginware.incisafe

import android.Manifest
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import expo.modules.ReactActivityDelegateWrapper

class MainActivity : ReactActivity() {
  
  // Declare the launcher at the top of your Activity/Fragment:
  private val requestPermissionLauncher = registerForActivityResult(
      ActivityResultContracts.RequestPermission(),
  ) { isGranted: Boolean ->
      if (isGranted) {
          // FCM SDK (and your app) can post notifications.
      } else {
          // TODO: Inform user that your app will not show notifications.
      }
  }

  override fun onCreate(savedInstanceState: Bundle?) {
      // Set the theme to AppTheme BEFORE onCreate to support
      // coloring the background, status bar, and navigation bar.
      // This is required for expo-splash-screen.
      setTheme(R.style.AppTheme)
      super.onCreate(null)
      
      // Call the method to ask for notification permission
      askNotificationPermission()
  }

  private fun askNotificationPermission() {
      // This is only necessary for API level >= 33 (TIRAMISU)
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
          if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) ==
              PackageManager.PERMISSION_GRANTED
          ) {
              // FCM SDK (and your app) can post notifications.
          } else if (shouldShowRequestPermissionRationale(Manifest.permission.POST_NOTIFICATIONS)) {
              // TODO: display an educational UI explaining to the user the features that will be enabled
              //       by them granting the POST_NOTIFICATION permission. This UI should provide the user
              //       "OK" and "No thanks" buttons. If the user selects "OK," directly request the permission.
              //       If the user selects "No thanks," allow the user to continue without notifications.
          } else {
              // Directly ask for the permission
              requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
          }
      }
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "main"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
      return ReactActivityDelegateWrapper(
          this,
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
          object : DefaultReactActivityDelegate(
              this,
              mainComponentName,
              fabricEnabled
          ) {}
      )
  }

  /**
   * Align the back button behavior with Android S
   * where moving root activities to background instead of finishing activities.
   * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
   */
  override fun invokeDefaultOnBackPressed() {
      if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
          if (!moveTaskToBack(false)) {
              // For non-root activities, use the default implementation to finish them.
              super.invokeDefaultOnBackPressed()
          }
          return
      }

      // Use the default back button implementation on Android S
      // because it's doing more than [Activity.moveTaskToBack] in fact.
      super.invokeDefaultOnBackPressed()
  }
}
