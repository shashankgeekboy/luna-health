import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  StyleProp, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { Colors } from '@/constants/Colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon
}) => {
  const getButtonStyles = () => {
    const baseStyles = [styles.button, styles[`${size}Button`]];
    
    if (variant === 'primary') {
      baseStyles.push(styles.primaryButton);
    } else if (variant === 'secondary') {
      baseStyles.push(styles.secondaryButton);
    } else if (variant === 'outline') {
      baseStyles.push(styles.outlineButton);
    } else if (variant === 'ghost') {
      baseStyles.push(styles.ghostButton);
    }
    
    if (disabled) {
      baseStyles.push(styles.disabledButton);
    }
    
    return baseStyles;
  };
  
  const getTextStyles = () => {
    const baseStyles = [styles.text, styles[`${size}Text`]];
    
    if (variant === 'primary') {
      baseStyles.push(styles.primaryText);
    } else if (variant === 'secondary') {
      baseStyles.push(styles.secondaryText);
    } else if (variant === 'outline') {
      baseStyles.push(styles.outlineText);
    } else if (variant === 'ghost') {
      baseStyles.push(styles.ghostText);
    }
    
    if (disabled) {
      baseStyles.push(styles.disabledText);
    }
    
    return baseStyles;
  };
  
  return (
    <TouchableOpacity
      style={[...getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? 'white' : Colors.primary} 
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={[...getTextStyles(), textStyle]}>{title}</Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    height: 32,
    paddingHorizontal: 12,
  },
  mediumButton: {
    height: 44,
    paddingHorizontal: 16,
  },
  largeButton: {
    height: 56,
    paddingHorizontal: 24,
  },
  disabledButton: {
    backgroundColor: Colors.gray300,
    borderColor: Colors.gray300,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: 'white',
  },
  outlineText: {
    color: Colors.primary,
  },
  ghostText: {
    color: Colors.primary,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    color: Colors.gray500,
  },
});

export default Button;